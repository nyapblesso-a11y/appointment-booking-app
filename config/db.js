import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

export const pool = new Pool(
  env.DATABASE_URL
    ? {
        connectionString: env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: env.DB_HOST,
        port: Number(env.DB_PORT || 5432),
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
      }
);

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL connected");

    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

export default pool;