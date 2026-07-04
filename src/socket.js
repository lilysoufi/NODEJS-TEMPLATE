const User = require("./models/User");
const Message = require("./models/Message");
const Room = require("./models/Room");

const onlineUsers = new Map();

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("New user connected" , socket.id);

        //user joins
        socket.on("join", async (username) => {
            try {
                // Find the user by username
                let user = await User.findOne({ username });
                // if not found then create a new user
                if(!user){
                    user = new User({ username });
                    await user.save();
                    console.log(`New user created: ${username}`);
                }
           
            // Updating the user's info 
            user.socketId = socket.id;
            user.isOnline = true;
            user.lastSeen = new Date();
            await user.save();

            // Add the user to the online users map
            onlineUsers.set(user._id.toString(), socket.id);
            socket.userId = user._id;
            socket.username = user.username;

            // Join default room
             user.currentRoom = "general";
             await user.save();

            // Send available rooms
            const rooms = await Room.find().select('name description participants');
                socket.emit('rooms_list', rooms);

            // Get online users
            const onlineUsersList = await User.find({ isOnline: true })
                .select('username currentRoom');

            io.emit('user_joined', {
                user: { id: user._id, username: user.username },
                onlineUsers: onlineUsersList,
                timestamp: new Date()
                });

            console.log(`${username} joined the chat`);

            } catch (error) {
                console.error('User join error:', error);
                socket.emit('error', { message: 'Failed to join chat' });
            }
        }
        );

        //User joins a room
        socket.on("joinRoom" , async (roomName) => {
            const user = await User.findById(socket.userId);
            if(!user)  return

            // Leave current room
            if (user.currentRoom) {
                socket.leave(user.currentRoom);
                io.to(user.currentRoom).emit('user_left_room', {
                    username: socket.username,
                    room: user.currentRoom
                });

            }

            //Join a room
            let room = await Room.findOne({ name: roomName.toLowerCase() });
            if (!room) {
                room = new Room({
                    name: roomName.toLowerCase(),
                 });
                await room.save();
            }
                
            // Add user to room participants
            if (!room.participants.includes(user._id)) {
            room.participants.push(user._id);
            await room.save();
             }

                
            // Update user's current room
           user.currentRoom = room.name;
            await user.save();

          // Join socket room
          socket.join(room.name);
          socket.currentRoom = room.name;

         // Send room history
         const messages = await Message.find({ chatRoom: room.name })
          .sort({ timestamp: -1 })
          .limit(50)
          .populate('sender', 'username');

        socket.emit('joined_room', {
           room: room.name,
           history: messages.reverse(),
           users: await User.find({ currentRoom: room.name, isOnline: true }).select('username')
         });

        // Notify room
        socket.to(room.name).emit('user_joined_room', {
          username: user.username,
          room: room.name,
          timestamp: new Date()
         });

            });

        //user sends a message
        socket.on("sendMessage" , async (msg) => {
           const user = await User.findById(socket.userId);
           if(!user) return
           const room = user?.currentRoom || 'general';
           
           const message = new Message({
             sender: user._id,
             username : user.username,
             content : msg ,
             chatRoom : room

           });
           await message.save();

            const populatedMessage = await Message.findById(message._id)
                    .populate('sender', 'username');

            // Broadcast to room ONLY
            io.to(room).emit('new_message', populatedMessage);
            console.log(`${socket.username} (${room}): ${msg}`);

        })


           socket.on('typing', async (isTyping) => {
            const user = await User.findById(socket.userId);
            if (user?.currentRoom) {
                socket.to(user.currentRoom).emit('user_typing', {
                    username: socket.username,
                    isTyping,
                    room: user.currentRoom
                });
            }
        });

        socket.on("disconnect", async () => {
           if (socket.userId) {
            await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastSeen: new Date() });
            onlineUsers.delete(socket.userId.toString());
           const onlineUsersList = await User.find({ isOnline: true }).select('username currentRoom');
           io.emit('user_left', { username: socket.username, onlineUsers: onlineUsersList });
        }
        console.log("User disconnected", socket.id);
       });

    });
}

module.exports = socketHandler;