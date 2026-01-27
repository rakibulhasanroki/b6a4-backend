import { Request, Response, Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { userAuth } from "../middleware/auth";

const router: Router = Router();

router.get("/auth/me", userAuth, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

router.all("/auth/*splat", toNodeHandler(auth));

export default router;
