import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`MediStore Backend Running`);
});

// better-auth
app.use("/api", routes);

export default app;
