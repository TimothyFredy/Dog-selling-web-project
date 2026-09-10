import express from "express";
import cors from "cors";
import dogRoutes from "./routes/dog.routes";
import { errorHandler, notFound } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Dog Store API is running"
  });
});

app.use("/api/dogs", dogRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
