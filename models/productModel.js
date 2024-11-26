import pool from "@/config/db";

export const getListProducts = async () => {
  try {
    const result = await pool.query(`
        SELECT 
          products.id, 
          products.name, 
          products.slug, 
          products.description, 
          products.stock_quantity, 
          products.sizes, 
          products.discount, 
          products.discount_type,
          pp.ori_currency,
          pp.currency,
          pp.ori_price,
          pp.price,
          json_build_object(
            'id', categories.id,
            'label', categories.title,
            'key', categories.title,
            'color', categories.color
          ) AS category,
          json_build_object(
            'id', brands.id,
            'label', brands.name,
            'key', brands.slug
          ) AS brand,
          (SELECT json_agg(
              json_build_object(
                  'id', color.id,
                  'name', color.name,
                  'code', color.code
              )
          ) 
          FROM product_colors pc
          LEFT JOIN colors color ON pc.color_id = color.id
          WHERE pc.product_id = products.id
          ) AS colors,
          (SELECT json_agg(
              json_build_object(
                  'image_url', product_images.image_url, 
                  'is_main_image', product_images.is_main_image
              )
          ) 
          FROM product_images
          WHERE product_images.product_id = products.id
          ) AS images,
          products.created_at, 
          products.updated_at
      FROM 
          products
      LEFT JOIN 
          categories ON products.category_id = categories.id
      LEFT JOIN 
          brands ON products.brand_id = brands.id
      LEFT JOIN 
          product_prices pp ON pp.product_id = products.id
      ORDER BY 
      products.updated_at DESC;
    `);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export const createProduct = async (
  name,
  slug,
  description,
  stock_quantity,
  price_data,
  selectedColorIds,
  sizes,
  brand_id,
  category_id,
  discount,
  discount_type,
  image_urls
) => {
  try {
    const result = await pool.query(
      `INSERT INTO products (name, slug, description, stock_quantity, sizes, brand_id, category_id, discount, discount_type, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        name,
        slug,
        description,
        stock_quantity,
        sizes,
        brand_id,
        category_id,
        discount || 0,
        discount_type,
        new Date()
      ]
    );

    const productId = result.rows[0].id;

    if (image_urls && image_urls.length > 0) {
      const imageInsertPromises = image_urls.map((imageUrl, index) => {
        return pool.query(
          `INSERT INTO product_images (product_id, image_url, is_main_image)
          VALUES ($1, $2, $3)`,
          [
            productId,
            imageUrl,
            index === 0
          ]
        );
      });
      await Promise.all(imageInsertPromises);
    } else {
      console.warn("No images provided, skipping image insertion.");
    }


    if (price_data) {
      const { oriCurrency, currency, oriPrice, price } = price_data;

      const oriPriceValue = oriCurrency && !isNaN(parseFloat(oriPrice)) ? parseFloat(oriPrice) : 0;
      const priceValue = price && !isNaN(parseFloat(price)) ? parseFloat(price) : 0;

      await pool.query(
        `INSERT INTO product_prices (product_id, ori_currency, currency, ori_price, price)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (product_id)
         DO UPDATE SET
            ori_currency = EXCLUDED.ori_currency,
            currency = EXCLUDED.currency,
            ori_price = EXCLUDED.ori_price,
            price = EXCLUDED.price`,
        [productId, oriCurrency, currency, oriPriceValue, priceValue]
      );
    }

    if (selectedColorIds && selectedColorIds.length > 0) {
      const colorInsertPromises = selectedColorIds.map((colorId) => {
        return pool.query(
          `INSERT INTO product_colors (product_id, color_id) VALUES ($1, $2)`,
          [productId, colorId]
        );
      });
      await Promise.all(colorInsertPromises);
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT products.id, 
              products.name, 
              products.slug, 
              products.description, 
              products.stock_quantity, 
              products.sizes, 
              products.discount, 
              products.discount_type,
              pp.ori_currency,
              pp.currency,
              pp.ori_price,
              pp.price,
              json_build_object(
                'label', categories.title,
                'key', categories.title
              ) AS category,
              json_build_object(
                'label', brands.name,
                'key', brands.slug
              ) AS brand,
              json_agg(json_build_object(
                'image_url', product_images.image_url, 
                'is_main_image', product_images.is_main_image
              )) AS images,
              products.created_at, 
              products.updated_at
       FROM 
            products
       LEFT JOIN 
            categories ON products.category_id = categories.id
       LEFT JOIN 
            brands ON products.brand_id = brands.id
       LEFT JOIN 
            product_images ON products.id = product_images.product_id
       LEFT JOIN 
            product_prices pp ON pp.product_id = products.id
       WHERE 
            products.id = $1
       GROUP BY 
            products.id, 
            pp.ori_currency,
            pp.currency,
            pp.ori_price,
            pp.price,
            categories.id, 
            brands.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export const updateProductById = async (
  productId,
  name,
  slug,
  description,
  stock_quantity,
  price_data,
  selectedColorIds,
  sizes,
  brand_id,
  category_id,
  discount,
  discount_type,
  image_urls
) => {
  try {
    // Update product details
    const result = await pool.query(
      `UPDATE products
       SET name = $1, slug = $2, description = $3, stock_quantity = $4, sizes = $5, 
           brand_id = $6, category_id = $7, discount = $8, discount_type = $9
       WHERE id = $10
       RETURNING *`,
      [
        name,
        slug,
        description,
        stock_quantity,
        sizes,
        brand_id,
        category_id,
        discount || 0,
        discount_type,
        productId
      ]
    );

    if (!result.rows.length) {
      throw new Error("Product not found.");
    }

    if (image_urls && image_urls.length > 0) {
      await pool.query(
        `DELETE FROM product_images WHERE product_id = $1`,
        [productId]
      );

      // Insert new images
      const imageInsertPromises = image_urls.map((imageUrl, index) => {
        return pool.query(
          `INSERT INTO product_images (product_id, image_url, is_main_image)
          VALUES ($1, $2, $3)`,
          [productId, imageUrl, index === 0]
        );
      });
      await Promise.all(imageInsertPromises);
    } else {
      console.warn("No images provided, skipping image update.");
      await pool.query(`DELETE FROM product_images WHERE product_id = $1`, [productId]);
    }

    // Update product prices if price data is provided
    if (price_data) {
      const { oriCurrency, currency, oriPrice, price } = price_data;

      const oriPriceValue = oriCurrency && !isNaN(parseFloat(oriPrice)) ? parseFloat(oriPrice) : 0;
      const priceValue = price && !isNaN(parseFloat(price)) ? parseFloat(price) : 0;

      // Ensure there is a unique constraint on product_id in the product_prices table
      await pool.query(
        `INSERT INTO product_prices (product_id, ori_currency, currency, ori_price, price)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (product_id)
         DO UPDATE SET
            ori_currency = EXCLUDED.ori_currency,
            currency = EXCLUDED.currency,
            ori_price = EXCLUDED.ori_price,
            price = EXCLUDED.price`,
        [productId, oriCurrency, currency, oriPriceValue, priceValue]
      );
    }

    // Update selected colors if new ones are provided
    if (selectedColorIds && selectedColorIds.length > 0) {
      // First, delete existing colors (if needed)
      await pool.query(
        `DELETE FROM product_colors WHERE product_id = $1`,
        [productId]
      );

      // Insert new colors
      const colorInsertPromises = selectedColorIds.map((colorId) => {
        return pool.query(
          `INSERT INTO product_colors (product_id, color_id) VALUES ($1, $2)`,
          [productId, colorId]
        );
      });
      await Promise.all(colorInsertPromises);
    }

    return result.rows[0];  // Return the updated product
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await pool.query(
      `DELETE FROM product_images WHERE product_id = $1`, [productId]
    );

    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`, [productId]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}