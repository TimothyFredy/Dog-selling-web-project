import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { testConnection } from "./database/db";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Dog Store API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
