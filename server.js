import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import initSocket from "./src/socket.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

initSocket(io);

server.listen(PORT, () => console.log(`🚀 Serveur backend sur http://localhost:${PORT}`));
