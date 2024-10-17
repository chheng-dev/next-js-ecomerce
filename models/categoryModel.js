import pool from "@/config/db";

export const getCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY updated_at DESC');
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export const createCategory = async (title, color) => {
  try {
    const result = await pool.query(
      'INSERT INTO categories (title, color) VALUES ($1, $2) RETURNING *',
      [title, color]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}


export const getCategoryById = async (catId) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [catId]);
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Failed to fetch category data');
  }
}

export const updateCategory = async (id, title, color) => {
  try {
    const result = await pool.query(
      `UPDATE categories SET 
        title = $1, 
        color = $2 
      WHERE id = $3
      RETURNING *`,
      [
        title,
        color,
        id
      ]
    );

    if (result.rowCount === 0) {
      throw new Error('Category not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category data');
  }
}


export const deleteCategoryById = async (id) => {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}