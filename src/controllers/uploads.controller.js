const uploadCloudinary = require("../utils/uploadToCloudinary")

const UploadController {
     local = async (req, res) {
        const file = req.file;

        if(!file) {
            return res.status(400).json({ message : "File is required!"})
        }

        const filePath = file.filePath
        return res.status(200).json({ message : "This is the path" , file , path :filePath })
     },

     cloud = async (req , res) {
        const file = req.file;
        
         if(!file) {
            return res.status(400).json({ message : "File is required!"})
        }

        const filepath = await uploadCloudinary(file);
        return res.status(400).json({ message : "This the file path" , file , path : filepath})
     }
}

module.exports = new UploadController();