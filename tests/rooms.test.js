import request from "supertest";
import app from "../src/app.js";
import pool from "../src/database.js";
import "../tests/setupTestDB.js";

describe("🧩 API Rooms", () => {
    let createdRoomId = null;
    let createdUserId = null;

    test("POST /rooms → crée une nouvelle room", async () => {
        const res = await request(app).post("/rooms");
        expect(res.statusCode).toBe(201);
        expect(res.body.room.id).toBeDefined();
        expect(res.body.player.user_id).toBeDefined();
        createdRoomId = res.body.room.id;
        createdUserId = res.body.player.user_id;
    });

    test("POST /rooms/:id/join → rejoint une room existante", async () => {
        const res = await request(app).post(`/rooms/${createdRoomId}/join`);
        expect(res.statusCode).toBe(200);
        expect(res.body.room.id).toBe(createdRoomId);
        expect(res.body.player.user_id).toBeDefined();
    });

    test("PUT /rooms/:id/role → met à jour le rôle du joueur", async () => {
        const res = await request(app)
            .put(`/rooms/${createdRoomId}/role`)
            .send({ userId: createdUserId, role: "agent" });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test("PUT /rooms/:id/ready → change le statut ready", async () => {
        const res = await request(app)
            .put(`/rooms/${createdRoomId}/ready`)
            .send({ userId: createdUserId, isReady: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test("GET /rooms/:id → récupère l’état de la room", async () => {
        const res = await request(app).get(`/rooms/${createdRoomId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.room.id).toBe(createdRoomId);
        expect(Array.isArray(res.body.players)).toBe(true);
    });

    test("POST /rooms/:id/start → démarre la partie", async () => {
        const res = await request(app).post(`/rooms/${createdRoomId}/start`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const check = await request(app).get(`/rooms/${createdRoomId}`);
        expect(check.body.room.status).toBe("playing");
    });
});

afterAll(async () => {
    await pool.end();
});
