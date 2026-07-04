const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads/';
        if (file.mimetype.startsWith('image/')) {
            folder += 'images/';
        } else if (file.mimetype.startsWith('application/')) {
            folder += 'documents/';
        } else {
            folder += 'others/';
        }
        
        // Create folder if it doesn't exist
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // 1023u023u4023u94
        const fileExtension = path.extname(file.originalname); // image.png => png 
        const baseName = path.basename(file.originalname, fileExtension); // image.png => image
        const safeFileName = baseName.replace(/[^a-zA-Z0-9]/g, '_'); // A => _

        cb(null, safeFileName + '-' + uniqueSuffix + fileExtension); // image-1023u023u4023u94.png
    },
});

// File filter for security
const fileFilter = (req, file, cb) => {
    // Check file types
    if (file.mimetype.startsWith('image/')) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
        }
    } else if (file.mimetype.startsWith('application/')) {
        const allowedDocs = ['application/pdf', 'application/msword'];
        if (allowedDocs.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOC files are allowed'), false);
        }
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

const uploadLocal = multer({
    storage,
    fileFilter : fileFilter,
    limits: {
        files: 5,
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Multer configuration for Cloudinary
const uploadCloud = multer({
    storage: cloudStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    }
});

module.exports = uploadLocal , uploadCloud;