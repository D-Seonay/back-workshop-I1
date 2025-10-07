import express from "express";
import cors from "cors";

import sessionRoutes from "./routes/session.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import roomRoutes from "./routes/room.routes.js";

import { setupSwagger } from "./swagger.js";

const app = express();
app.use(cors());
app.use(express.json());

// --- Routes principales ---
app.use("/api/session", sessionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes);

// --- Swagger ---
setupSwagger(app);

export default app;

