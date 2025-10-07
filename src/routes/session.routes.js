import express from "express";
import { createNewSession, joinSession, fetchSession } from "../controllers/session.controller.js";
const router = express.Router();

/**
 * @swagger
 * /api/session/create:
 *   post:
 *     summary: Crée une nouvelle session de jeu
 *     tags: [Session]
 *     responses:
 *       201:
 *         description: Session créée avec succès
 */
router.post("/create", createNewSession);

/**
 * @swagger
 * /api/session/join:
 *   post:
 *     summary: Rejoint une session existante
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "ABC123"
 *     responses:
 *       200:
 *         description: Session rejointe
 *       404:
 *         description: Session introuvable
 */
router.post("/join", joinSession);

/**
 * @swagger
 * /api/session/{id}:
 *   get:
 *     summary: Récupère une session via son ID
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la session
 *     responses:
 *       200:
 *         description: Session trouvée
 *       404:
 *         description: Session introuvable
 */
router.get("/:id", fetchSession);

export default router;
