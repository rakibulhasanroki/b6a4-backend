import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { allowedORigin } from "./config";

const app: Application = express();

app.use(
  cors({
    origin: allowedORigin,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>MediStore API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: system-ui, sans-serif;
            background: #f8fafc;
            color: #0f172a;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
          }
          .card {
            background: white;
            padding: 2rem 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            text-align: center;
          }
          p {
            color: #475569;
          }
          code {
            background: #e2e8f0;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>MediStore Backend</h1>
          <p>API is running successfully</p>
          <p>Base URL: <code>/api</code></p>
          <p>Status: <strong>Online</strong></p>
        </div>
      </body>
    </html>
  `);
});

// better-auth
app.use("/api", routes);
// not found route
app.use(notFound);
// error handler route
app.use(errorHandler);

export default app;
