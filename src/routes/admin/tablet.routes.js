import { Router } from "express";
import controller from "../../controllers/admin/tablet.controller.js";

const route = Router();
route.post("/assign", 
    // [authMiddleware, dealerMiddleware], 
    controller.assign);

route.get("/tablets", 
// [authMiddleware, dealerMiddleware], 
controller.get_tablet_teams);

export default route;
