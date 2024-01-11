import { Router } from "express";
import controller from "../../controllers/admin/team.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/team", 
// [verifyAdmin], 
controller.create);

export default route;
