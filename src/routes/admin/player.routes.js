import { Router } from "express";
import controller from "../../controllers/admin/player.controller";
import { verifyAdmin } from "../../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/player",
// [verifyAdmin], 
controller.add);

route.get("/player/:id",
// [verifyAdmin], 
controller.get_by_id);

route.get("/players/:teamId",
// [verifyAdmin], 
controller.get);

route.put("/player/:id",
// [verifyAdmin], 
controller.update);

route.delete("/player/:id",
// [verifyAdmin], 
controller.delete);

export default route;
