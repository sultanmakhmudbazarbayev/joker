import { Router } from "express";
import controller from "../../controllers/admin/player.controller";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/player", 
// [verifyAdmin], 
controller.add);

export default route;
