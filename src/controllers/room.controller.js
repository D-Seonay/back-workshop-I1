import * as RoomModel from "../models/RoomModel.js";
import { logEvent } from "../utils/logger.js";

export const createRoom = async (req, res) => {
  const { room, player } = await RoomModel.createRoom();
  await logEvent(room.id, "connection", `Room ${room.id} créée par ${player.user_id}`);
  res.status(201).json({ room, player });
};

export const joinRoom = async (req, res) => {
  const { roomId } = req.params;
  const data = await RoomModel.joinRoom(roomId);
  if (!data) return res.status(404).json({ error: "Room introuvable" });

  await logEvent(roomId, "connection", `Joueur ${data.player.user_id} a rejoint la room`);
  res.json(data);
};

export const updatePlayerRole = async (req, res) => {
  const { roomId } = req.params;
  const { role, userId } = req.body;
  const success = await RoomModel.updatePlayerRole(roomId, userId, role);
  if (!success) return res.status(404).json({ error: "Player non trouvé" });

  await logEvent(roomId, "progress", `${userId} est devenu ${role}`);
  res.json({ success });
};

export const setPlayerReady = async (req, res) => {
  const { roomId } = req.params;
  const { userId, isReady } = req.body;
  const success = await RoomModel.setPlayerReady(roomId, userId, isReady);
  if (!success) return res.status(404).json({ error: "Player non trouvé" });

  await logEvent(roomId, "progress", `${userId} est prêt: ${isReady}`);
  res.json({ success });
};

export const getRoomState = async (req, res) => {
  const { roomId } = req.params;
  const state = await RoomModel.getRoomState(roomId);
  if (!state) return res.status(404).json({ error: "Room introuvable" });
  res.json(state);
};

export const startGame = async (req, res) => {
  const { roomId } = req.params;
  const success = await RoomModel.startGame(roomId);
  if (!success) return res.status(404).json({ error: "Room introuvable" });

  await logEvent(roomId, "progress", `La partie a démarré.`);
  res.json({ success });
};
