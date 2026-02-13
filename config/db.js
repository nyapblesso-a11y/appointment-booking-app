import pkg from 'pg'
import { env } from './env.js'

const {Pool} = pkg

export const pool = new Pool ({
 port: env.DB_PORT,
 host: env.DB_HOST,
 database: env.DB_NAME,
 user: env.DB_USER,
 password: env.DB_PASSWORD,
})


export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected:', env.DB_NAME);
    client.release();
  } catch (error) {
    console.error(' PostgreSQL connection failed:', error);
    process.exit(1);
  }
} 

export default pool