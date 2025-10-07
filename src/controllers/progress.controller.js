import { updateProgress } from "../models/SessionModel.js";
import { logEvent } from "../utils/logger.js";

export const updateSessionProgress = async (req, res) => {
  const { sessionId, city, code } = req.body;
  const result = await updateProgress(sessionId, city, code);
  if (!result) return res.status(404).json({ error: "Session non trouvée" });

  await logEvent(sessionId, "progress", `Ville ${city} terminée avec code ${code}`);
  res.json({ message: "Progression mise à jour", result });
};
