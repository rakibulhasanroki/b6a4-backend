import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandele";

const app: Application = express();
const allowedOrigins = process.env.APP_URL?.split(",") || [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`MediStore Backend Running`);
});

// better-auth
app.use("/api", routes);
// not found route
app.use(notFound);
// error handler route
app.use(errorHandler);

export default app;
