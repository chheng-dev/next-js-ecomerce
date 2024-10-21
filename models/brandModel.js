import pool from "@/config/db";

export const getListBrands = async () => {
  try {
    const result = await pool.query('SELECT * FROM brands ORDER BY updated_at DESC');
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export const createBrand = async (name, slug, icon_url) => {
  try {
    const result = await pool.query(
      'INSERT INTO brands (name, slug, icon_url) VALUES ($1, $2, $3) RETURNING *',
      [name, slug, icon_url]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export const getBrandById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM brands WHERE id = $1`, [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];

  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Failed to fetch category data');
  }
}

export const updateBrand = async (id, name, slug, icon_url) => {
  try {
    const result = await pool.query(
      `UPDATE brands SET
        name = $1,
        slug = $2,
        icon_url = $3
      WHERE id = $4
      RETURNING *`,
      [name, slug, icon_url, id]
    );

    if (result.rowCount === 0) {
      throw new Error('Brand not found');
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error updating brand:', error.message);

    throw new Error('Failed to update brand data');
  }
};


export const deleteBrandById = async (id) => {
  try {
    const result = await pool.query('DELETE FROM brands WHERE id = $1 RETURNING *', [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}