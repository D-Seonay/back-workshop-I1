import pool from "../database.js";

export async function createSession(id) {
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO sessions (id, completedCities, codes) VALUES (?, '[]', '{}')", [id]);
  conn.release();
}

export async function getSession(id) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT * FROM sessions WHERE id = ?", [id]);
  conn.release();
  return rows || null;
}

export async function updateProgress(sessionId, city, code) {
  const conn = await pool.getConnection();
  const [session] = await conn.query("SELECT * FROM sessions WHERE id = ?", [sessionId]);
  if (!session.length) return null;

  const completedCities = JSON.parse(session[0].completedCities || "[]");
  const codes = JSON.parse(session[0].codes || "{}");

  if (!completedCities.includes(city)) completedCities.push(city);
  codes[city] = code;

  await conn.query(
    "UPDATE sessions SET completedCities = ?, codes = ? WHERE id = ?",
    [JSON.stringify(completedCities), JSON.stringify(codes), sessionId]
  );

  conn.release();
  return { completedCities, codes };
}
