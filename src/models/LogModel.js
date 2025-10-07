import pool from "../database.js";

export async function getLogs(sessionId) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT * FROM logs WHERE session_id = ?", [sessionId]);
  conn.release();
  return rows;
}
