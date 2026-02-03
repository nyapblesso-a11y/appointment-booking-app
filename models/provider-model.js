import { pool } from "../config/db.js";

export const createProvider = async(userId, name ) => {
    const query = `INSERT INTO providers (user_id, service_name) VALUE ($1, $2)`;

    const {rows}= await pool.query(query, [userId, name])
    return rows[0]
}

export const getProvider = async(id) => {
    const query = `SELECT * FROM  providers`
    const {rows} =  await pool.query(query, id)
    return rows[0]
}