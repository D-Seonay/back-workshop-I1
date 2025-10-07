import { createSession, getSession } from "../models/SessionModel.js";
import { generateCode } from "../utils/generateCode.js";
import { logEvent } from "../utils/logger.js";

export const createNewSession = async (req, res) => {
  const id = generateCode(6);
  await createSession(id);
  await logEvent(id, "connection", `Session ${id} créée.`);
  res.status(201).json({ sessionId: id });
};

export const joinSession = async (req, res) => {
  const { sessionId } = req.body;
  const session = await getSession(sessionId);
  if (!session.length) return res.status(404).json({ error: "Session introuvable" });

  await logEvent(sessionId, "connection", `Un joueur a rejoint la session ${sessionId}.`);
  res.json({ message: "Session rejointe", session });
};

export const fetchSession = async (req, res) => {
  const { id } = req.params;
  const session = await getSession(id);
  if (!session.length) return res.status(404).json({ error: "Session introuvable" });
  res.json(session[0]);
};
