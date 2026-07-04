const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/uploads.controller");
const asyncHandler =  require("../utils/asyncHandler")
const uploadLocal = require("../middlewares/multer");
const uploadCloud = require("../middlwares/multer");
const multer = require("multer")

router.post("/local" ,
    [uploadLocal.single("file")],
    asyncHandler(UploadController.local)
)

router.post("/cloud",
    [uploadCloud.single("file")],
    asyncHandler(UploadController.cloud)
)

module.exports = router;