import pool from "../database.js";

export async function saveScore(sessionId, total_time, points) {
  const conn = await pool.getConnection();
  await conn.query(
    "INSERT INTO scores (session_id, total_time, points) VALUES (?, ?, ?)",
    [sessionId, total_time, points]
  );
  conn.release();
}
