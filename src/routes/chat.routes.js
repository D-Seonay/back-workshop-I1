import express from "express";
import { logChatMessage } from "../controllers/chat.controller.js";
const router = express.Router();

/**
 * @swagger
 * /api/chat/log:
 *   post:
 *     summary: Enregistre un message dans les logs
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message enregistré
 */
router.post("/log", logChatMessage);

export default router;
