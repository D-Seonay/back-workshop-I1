import pool from "../src/database.js";

beforeAll(async () => {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM room_players");
    await conn.query("DELETE FROM rooms");
    conn.release();
});

afterAll(async () => {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM room_players");
    await conn.query("DELETE FROM rooms");
    conn.release();
    await pool.end();
});
