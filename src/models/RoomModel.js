import pool from "../database.js";

export async function createRoom() {
  const conn = await pool.getConnection();
  const id = Math.random().toString(36).substring(2, 8).toUpperCase();
  await conn.query("INSERT INTO rooms (id) VALUES (?)", [id]);

  // créer aussi un player créateur
  const userId = crypto.randomUUID();
  await conn.query(
    "INSERT INTO room_players (room_id, user_id, role, is_ready) VALUES (?, ?, NULL, FALSE)",
    [id, userId]
  );
  const [room] = await conn.query("SELECT * FROM rooms WHERE id = ?", [id]);
  const [player] = await conn.query("SELECT * FROM room_players WHERE room_id = ? AND user_id = ?", [id, userId]);
  conn.release();

  return { room: room[0], player: player[0] };
}

export async function joinRoom(roomId) {
  const conn = await pool.getConnection();
  const [room] = await conn.query("SELECT * FROM rooms WHERE id = ?", [roomId]);
  if (!room.length) {
    conn.release();
    return null;
  }

  const userId = crypto.randomUUID();
  await conn.query(
    "INSERT INTO room_players (room_id, user_id) VALUES (?, ?)",
    [roomId, userId]
  );
  const [player] = await conn.query("SELECT * FROM room_players WHERE room_id = ? AND user_id = ?", [roomId, userId]);
  conn.release();

  return { room: room[0], player: player[0] };
}

export async function updatePlayerRole(roomId, userId, role) {
  const conn = await pool.getConnection();
  const res = await conn.query(
    "UPDATE room_players SET role = ? WHERE room_id = ? AND user_id = ?",
    [role, roomId, userId]
  );
  conn.release();
  return res.affectedRows > 0;
}

export async function setPlayerReady(roomId, userId, isReady) {
  const conn = await pool.getConnection();
  const res = await conn.query(
    "UPDATE room_players SET is_ready = ? WHERE room_id = ? AND user_id = ?",
    [isReady, roomId, userId]
  );
  conn.release();
  return res.affectedRows > 0;
}

export async function getRoomState(roomId) {
  const conn = await pool.getConnection();
  const [room] = await conn.query("SELECT * FROM rooms WHERE id = ?", [roomId]);
  const [players] = await conn.query("SELECT * FROM room_players WHERE room_id = ?", [roomId]);
  conn.release();
  if (!room.length) return null;
  return { room: room[0], players };
}

export async function startGame(roomId) {
  const conn = await pool.getConnection();
  const res = await conn.query(
    "UPDATE rooms SET status = 'playing' WHERE id = ?",
    [roomId]
  );
  conn.release();
  return res.affectedRows > 0;
}
