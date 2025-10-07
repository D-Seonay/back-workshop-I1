const mariadb = require('mariadb');

describe('Test de connexion à la base de données sur le port 3307', () => {
  let pool;

  beforeAll(() => {
    pool = mariadb.createPool({
      host: process.env.DB_HOST || 'mariadb',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'escape_musee',
      port: 3307,
      connectionLimit: 5,
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  test('Connexion réussie à la base de données', async () => {
    const conn = await pool.getConnection();
    expect(conn).toBeDefined();
    await conn.release();
  });
});