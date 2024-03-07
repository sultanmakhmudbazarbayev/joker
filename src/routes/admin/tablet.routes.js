import { Router } from "express";
import controller from "../../controllers/admin/tablet.controller.js";

const route = Router();
route.post("/set-tablets", 
    // [authMiddleware, dealerMiddleware], 
    controller.set_tablets);

route.get("/tablets", 
// [authMiddleware, dealerMiddleware], 
controller.get_tablet_teams);

route.get("/tablet", 
// [authMiddleware, dealerMiddleware], 
controller.get_tablet);

export default route;
