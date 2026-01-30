import { Request, Response, Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const router: Router = Router();

router.all("/auth/*splat", toNodeHandler(auth));

export default router;
