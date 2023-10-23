import { Router } from "express";
import { generateImage } from "../controllers/generateImg";

const Routes = Router();

Routes.post("/ai/generate-image", generateImage);

export default Routes;