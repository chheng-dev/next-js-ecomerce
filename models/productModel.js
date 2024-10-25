import pool from "@/config/db";
import { NextResponse } from "next/server";

export const getListProducts = async () => {
  try {
    const result = await pool.query(`
        SELECT 
            products.id, 
            products.name, 
            products.slug, 
            products.description, 
            products.ori_price, 
            products.price, 
            products.currency, 
            products.stock_quantity, 
            products.colors, 
            products.sizes, 
            products.created_at, 
            products.updated_at, 
            products.discount, 
            products.discount_type,
            categories.title AS category_name, 
            categories.color AS category_color,
            brands.name AS brand_name,
            json_agg(json_build_object(
                'image_url', product_images.image_url, 
                'is_main_image', product_images.is_main_image
            )) AS images
        FROM 
            products
        LEFT JOIN 
            categories ON products.category_id = categories.id
        LEFT JOIN 
            brands ON products.brand_id = brands.id
        LEFT JOIN 
            product_images ON products.id = product_images.product_id
        GROUP BY 
            products.id, 
            categories.title, 
            categories.color,
            brands.name 
        ORDER BY 
            products.updated_at DESC;
    `);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export const createProduct = async (name, slug,
  description, ori_price, price, stock_quantity, colors, sizes, brand_id, category_id,
  discount, discount_type, image_urls) => {
  try {
    const result = await pool.query(
      `INSERT INTO products(name, slug,
        description, ori_price, price, discount, discount_type, stock_quantity, 
        colors, sizes, brand_id, category_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
      `,
      [name, slug,
        description, ori_price,
        price,
        discount,
        discount_type,
        stock_quantity,
        colors,
        sizes, brand_id,
        category_id
      ]
    );

    const productId = result.rows[0].id;

    const imageInsertPromises = image_urls.map((imageUrl, index) => {
      return pool.query(
        `INSERT INTO product_images(product_id, image_url, is_main_image)
        VALUES($1, $2, $3)`,
        [
          productId,
          imageUrl,
          index === 0
        ]
      );
    });

    await Promise.all(imageInsertPromises);


    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export const getProductById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT products.id, 
              products.name, 
              products.slug, 
              products.description, 
              products.ori_price, 
              products.price, 
              products.currency, 
              products.stock_quantity, 
              products.colors, 
              products.sizes, 
              products.created_at, 
              products.updated_at, 
              products.discount, 
              products.discount_type,
              categories.title AS category,
              brands.name AS brand,
              json_agg(json_build_object(
                'image_url', product_images.image_url, 
                'is_main_image', product_images.is_main_image
              )) AS images
       FROM products
       LEFT JOIN categories ON products.category_id = categories.id
       LEFT JOIN brands ON products.brand_id = brands.id
       LEFT JOIN product_images ON products.id = product_images.product_id
       WHERE products.id = $1
       GROUP BY products.id, categories.title, brands.name`,
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