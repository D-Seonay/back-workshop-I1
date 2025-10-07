import express from "express";
import { updateSessionProgress } from "../controllers/progress.controller.js";
const router = express.Router();

/**
 * @swagger
 * /api/progress/update:
 *   post:
 *     summary: Met à jour la progression d'une session
 *     tags: [Progression]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               city:
 *                 type: string
 *                 example: "paris"
 *               code:
 *                 type: string
 *                 example: "LISA"
 *     responses:
 *       200:
 *         description: Progression mise à jour
 *       404:
 *         description: Session non trouvée
 */
router.post("/update", updateSessionProgress);

export default router;
