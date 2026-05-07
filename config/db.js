import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

// HARD CHECK (prevents silent crashes)
if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in environment variables");
}

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

export default pool;