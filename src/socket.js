import { logEvent } from "./utils/logger.js";

export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Nouveau joueur connecté :", socket.id);

    socket.on("join_room", async (sessionId) => {
      socket.join(sessionId);
      await logEvent(sessionId, "connection", `Socket ${socket.id} a rejoint la room ${sessionId}`);
      io.to(sessionId).emit("player_joined", socket.id);
    });

    socket.on("send_message", async ({ sessionId, message, sender }) => {
      io.to(sessionId).emit("receive_message", { sender, message });
      await logEvent(sessionId, "chat", `${sender}: ${message}`);
    });

    socket.on("validate_enigma", async ({ sessionId, enigma }) => {
      io.to(sessionId).emit("enigma_validated", enigma);
      await logEvent(sessionId, "enigma", `Énigme validée : ${enigma}`);
    });

    socket.on("disconnect", () => console.log("❌ Déconnexion :", socket.id));
  });
}
