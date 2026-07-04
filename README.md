#  Uploads, Docker and Socket.io chat

  

##  📸 File Upload System with Multer & Cloudinary

A complete file upload solution supporting both local storage (Multer) and cloud storage (Cloudinary) with image validation, multiple file support, and error handling.

  

##  ✨ Features

  

- ✅ Local Storage - Save files to your server using Multer

- ✅ Cloud Storage - Upload to Cloudinary cloud service

- ✅ Image Validation - Only JPG, JPEG, PNG, GIF, WEBP allowed

- ✅ Size Limiting - Max 5MB per file

- ✅ Error Handling - Clear error messages for users

- ✅ REST API - Easy to integrate with frontend

- ✅ Environment Config - Secure configuration via .env

  

###  Installation

1. Clone the repository
```
git clone https://github.com/lilysoufi/Task-10-Uploads_Docker_ChatWithSocketIO.git
```
2. Install dependencies
```
npm insatll
```
3. Set up environment variables
```
cp .env.example .env
```
4. Update `.env` file with your credentials:
```
// Server

PORT=3000

//MongoDB

MONGODB_URL=your-Database_connection

// Cloudinary 

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```


5. Start the server
```
npm run start
```
##  🛠 API Endpoints

Local
```
POST /upload/local
```
Cloud using Cloudinary
```
POST /upload/cloud
```
  

##  📦 Docker

1. Clone the repository
```
git clone https://github.com/lilysoufi/Task-10-Uploads_Docker_ChatWithSocketIO.git
```

2. cd your-project

2. Build and start the containers
```
docker-compose up --build
```
This builds the Docker image and starts all services (API + MongoDB)

  

##  📦 Docker Commands

  

###  Start the application

  
```
#  Build and start (with logs visible)

docker-compose up --build

#  Build and start (in background)

docker-compose up -d --build

#  Start without rebuilding

docker-compose up
```
###  Stop the application
```
#  Stop containers

docker-compose down

#  Stop and remove volumes (clears database data)

docker-compose down -v
```
###  View logs
```
#  See all logs

docker-compose logs
```
###  Rebuild after changes
```
#  Rebuild and restart

docker-compose up --build -d
```
  

#  Socket.IO Chat

A real-time chat application built with [Socket.io](https://socket.io/) with a simple HTML page for testing purposes .

##  ✨ Features

  

- ✅ Real-time Messaging - Instant message delivery with [Socket.io](https://socket.io/)

- ✅ Multiple Rooms - Create or join chat rooms

- ✅ User Presence - See who's online and joining/leaving

- ✅ Typing Indicators - See when users are typing

- ✅ Message History - Save and display chat history

- ✅ Responsive UI - Works on desktop and mobile

- ✅ Docker Support - Easy deployment with Docker

- ✅ No Authentication - Simple join with username

  

##  🛠 Tech Stack

  

Technology --------- Purpose

  

Node.js ------------- Backend runtime

  

Express ------------- Web framework

  

[Socket.io](https://socket.io/) ----------- Real-time WebSocket communication

  

MongoDB ---------- Message persistence (optional)

  

HTML/CSS/JS ---- Frontend

  

Docker ------------ Containerization

  

##  Chat Testing

start the server
```
npm run start
```
Open your browser
```
#  Visit: http://localhost:3000
```
###  . Enter Your Details

  

- Enter a username

- Enter a room name (or use the default : general )

  

  

###  3. Start Chatting!

  

- Type a message in the input field

- Press Enter or click Send

- See messages appear in real-time

- Watch for typing indicators


## Author
**Eng.Alaa Soufi** ❤️