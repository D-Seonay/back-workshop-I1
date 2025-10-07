import { logEvent } from "../utils/logger.js";

export const logChatMessage = async (req, res) => {
  const { sessionId, message } = req.body;
  await logEvent(sessionId, "chat", message);
  res.json({ message: "Message loggé" });
};
