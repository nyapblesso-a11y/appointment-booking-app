import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

// Use DATABASE_URL if available (Render provides it)
const pool = env.DATABASE_URL
  ? new Pool({
      connectionString: env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Render Postgres
    })
  : new Pool({
      port: env.DB_PORT,
      host: env.DB_HOST,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    });

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(
      "PostgreSQL connected:",
      env.DATABASE_URL ? "via DATABASE_URL" : env.DB_NAME,
      env.DB_PORT,
      env.DB_HOST
    );
    client.release();
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

export default pool;
