import { Router } from "express";
import controller from "../controllers/multer.controller.js";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";
import uploadImage from "../middlewares/multer.middleware.js";

const route = Router();
route.post("/upload", 
// [verifyAdmin], 
    uploadImage,
    controller.save);


export default route;
