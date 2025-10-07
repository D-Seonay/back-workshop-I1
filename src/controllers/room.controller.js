import * as RoomModel from "../models/RoomModel.js";
import { logEvent } from "../utils/logger.js";

export const createRoom = async (req, res) => {
  console.log("createRoom appelé avec req:", req.body);
  const { room, player } = await RoomModel.createRoom();
  console.log("Room créée:", room, "Player:", player);
  await logEvent(room.id, "connection", `Room ${room.id} créée par ${player.user_id}`);
  res.status(201).json({ room, player });
  console.log("Réponse envoyée pour createRoom");
};

export const joinRoom = async (req, res) => {
  console.log("joinRoom appelé avec params:", req.params);
  const { roomId } = req.params;
  const data = await RoomModel.joinRoom(roomId);
  console.log("Résultat de joinRoom:", data);
  if (!data) {
    console.warn("Room introuvable pour roomId:", roomId);
    return res.status(404).json({ error: "Room introuvable" });
  }

  await logEvent(roomId, "connection", `Joueur ${data.player.user_id} a rejoint la room`);
  res.json(data);
  console.log("Réponse envoyée pour joinRoom");
};

export const updatePlayerRole = async (req, res) => {
  console.log("updatePlayerRole appelé avec params:", req.params, "body:", req.body);
  const { roomId } = req.params;
  const { role, userId } = req.body;
  const success = await RoomModel.updatePlayerRole(roomId, userId, role);
  console.log("Résultat de updatePlayerRole:", success);
  if (!success) {
    console.warn("Player non trouvé pour userId:", userId, "dans roomId:", roomId);
    return res.status(404).json({ error: "Player non trouvé" });
  }

  await logEvent(roomId, "progress", `${userId} est devenu ${role}`);
  res.json({ success });
  console.log("Réponse envoyée pour updatePlayerRole");
};

export const setPlayerReady = async (req, res) => {
  console.log("setPlayerReady appelé avec params:", req.params, "body:", req.body);
  const { roomId } = req.params;
  const { userId, isReady } = req.body;
  const success = await RoomModel.setPlayerReady(roomId, userId, isReady);
  console.log("Résultat de setPlayerReady:", success);
  if (!success) {
    console.warn("Player non trouvé pour userId:", userId, "dans roomId:", roomId);
    return res.status(404).json({ error: "Player non trouvé" });
  }

  await logEvent(roomId, "progress", `${userId} est prêt: ${isReady}`);
  res.json({ success });
  console.log("Réponse envoyée pour setPlayerReady");
};

export const getRoomState = async (req, res) => {
  console.log("getRoomState appelé avec params:", req.params);
  const { roomId } = req.params;
  const state = await RoomModel.getRoomState(roomId);
  console.log("État de la room récupéré:", state);
  if (!state) {
    console.warn("Room introuvable pour roomId:", roomId);
    return res.status(404).json({ error: "Room introuvable" });
  }
  res.json(state);
  console.log("Réponse envoyée pour getRoomState");
};

export const startGame = async (req, res) => {
  console.log("startGame appelé avec params:", req.params);
  const { roomId } = req.params;
  const success = await RoomModel.startGame(roomId);
  console.log("Résultat de startGame:", success);
  if (!success) {
    console.warn("Room introuvable pour roomId:", roomId);
    return res.status(404).json({ error: "Room introuvable" });
  }

  await logEvent(roomId, "progress", `La partie a démarré.`);
  res.json({ success });
  console.log("Réponse envoyée pour startGame");
};
