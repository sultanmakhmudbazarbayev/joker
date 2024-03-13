import { Router } from "express";
import controller from "../controllers/multer.controller.js";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";
import {uploadAudio, uploadImage, uploadVideo} from "../middlewares/multer.middleware.js";

const route = Router();
route.post("/upload-image", 
// [verifyAdmin], 
    uploadImage,
    controller.save_image);


route.post("/upload-audio", 
// [verifyAdmin], 
    uploadAudio,
    controller.save_audio);

route.post("/upload-video", 
// [verifyAdmin], 
uploadVideo,
controller.save_video);


export default route;
