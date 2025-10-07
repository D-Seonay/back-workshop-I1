import express from "express";
import {
  createRoom,
  joinRoom,
  updatePlayerRole,
  setPlayerReady,
  getRoomState,
  startGame,
} from "../controllers/room.controller.js";

const router = express.Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Crée une nouvelle room de jeu
 *     tags: [Room]
 *     responses:
 *       201:
 *         description: Room créée avec succès
 */
router.post("/", createRoom);

/**
 * @swagger
 * /rooms/{roomId}/join:
 *   post:
 *     summary: Rejoint une room existante
 *     tags: [Room]
 */
router.post("/:roomId/join", joinRoom);

/**
 * @swagger
 * /rooms/{roomId}/role:
 *   put:
 *     summary: Met à jour le rôle du joueur
 *     tags: [Room]
 */
router.put("/:roomId/role", updatePlayerRole);

/**
 * @swagger
 * /rooms/{roomId}/ready:
 *   put:
 *     summary: Définit l’état prêt/non prêt du joueur
 *     tags: [Room]
 */
router.put("/:roomId/ready", setPlayerReady);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Récupère l’état actuel de la room
 *     tags: [Room]
 */
router.get("/:roomId", getRoomState);

/**
 * @swagger
 * /rooms/{roomId}/start:
 *   post:
 *     summary: Lance la partie (status = playing)
 *     tags: [Room]
 */
router.post("/:roomId/start", startGame);

export default router;
