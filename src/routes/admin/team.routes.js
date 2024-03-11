import { Router } from "express";
import controller from "../../controllers/admin/team.controller.js";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();

route.get("/teams/:id", 
// [verifyAdmin], 
controller.get_team_by_id);

route.get("/teams", 
// [verifyAdmin], 
controller.get_teams);

route.post("/team", 
// [verifyAdmin], 
controller.create);

route.put("/team/:id", 
// [verifyAdmin], 
controller.update);

export default route;
