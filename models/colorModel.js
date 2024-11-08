import pool from "@/config/db";

export const getListColors = async () => {
  try {
    const result = await pool.query('SELECT * FROM colors');
    return result.rows;
  } catch (error) {
    throw error;
  }
}