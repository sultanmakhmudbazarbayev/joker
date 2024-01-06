import { Router } from "express";
import controller from "../controllers/team.controller";
import { verifyAdmin } from "../middlewares/admin/auth.middleware.js";

const route = Router();
route.post("/team", [verifyAdmin], controller.create);

export default route;
