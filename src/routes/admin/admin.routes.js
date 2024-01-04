import { Router } from "express";
import controller from "../../controllers/admin/admin.controller.js";

const route = Router();
route.post("/admin", 
    // [authMiddleware, dealerMiddleware], 
    controller.create);


export default route;
