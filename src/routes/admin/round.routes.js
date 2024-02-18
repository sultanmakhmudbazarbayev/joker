import { Router } from "express";
import controller from "../../controllers/admin/round.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();
route.get("/rounds/:id", 
// [verifyAdmin], 
controller.get_round_by_id);

export default route;
