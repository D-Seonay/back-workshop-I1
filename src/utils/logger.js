import pool from "../database.js";

export async function logEvent(sessionId, type, message) {
  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO logs (session_id, type, message) VALUES (?, ?, ?)",
      [sessionId, type, message]
    );
    conn.release();
  } catch (err) {
    console.error("Erreur lors de l’insertion du log :", err);
  }
}

