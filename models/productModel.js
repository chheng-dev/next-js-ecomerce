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

// export const createProduct = async (name, slug,
//   description, stock_quantity, price_data, colors, sizes, brand_id, category_id,
//   discount, discount_type, image_urls) => {
//   try {
//     const result = await pool.query(
//       `INSERT INTO products(name, slug,
//         description, discount, discount_type, stock_quantity, 
//         colors, sizes, brand_id, category_id)
//       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//       RETURNING *
//       `,
//       [name, slug,
//         description,
//         discount,
//         discount_type,
//         stock_quantity,
//         colors,
//         sizes, brand_id,
//         category_id
//       ]
//     );

//     const productId = result.rows[0].id;

//     const imageInsertPromises = image_urls.map((imageUrl, index) => {
//       return pool.query(
//         `INSERT INTO product_images(product_id, image_url, is_main_image)
//         VALUES($1, $2, $3)`,
//         [
//           productId,
//           imageUrl,
//           index === 0
//         ]
//       );
//     });

//     // const priceInsertPromises = price_data.map(({ ori_currency, currency, ori_price, price }) =>
//     //   pool.query(`
//     //     INSERT INTO product_prices (product_id, ori_currency , currency, ori_price, price) 
//     //     VALUES ($1, $2, $3, $4, $5)`,
//     //     [productId, ori_currency, currency, ori_price, price]
//     //   )
//     // );
//     if (price_data) {
//       const { ori_currency, currency, ori_price, price } = price_data;

//       const oriPriceValue = ori_price ? parseFloat(ori_price) : null;
//       const PriceValue = price ? parseFloat(price) : null;

//       await pool.query(
//         `INSERT INTO product_prices (product_id, ori_currency, currency, ori_price, price)
//         VALUES ($1, $2, $3, $4, $5)`,
//         [productId, ori_currency, currency, oriPriceValue, PriceValue]
//       );
//     }



//     await Promise.all(imageInsertPromises);

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }
export const createProduct = async (
  name,
  slug,
  description,
  stock_quantity,
  price_data,
  colors,
  sizes,
  brand_id,
  category_id,
  discount,
  discount_type,
  image_urls
) => {
  try {
    const result = await pool.query(
      `INSERT INTO products (name, slug, description, stock_quantity, colors, sizes, brand_id, category_id, discount, discount_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        name,
        slug,
        description,
        stock_quantity,
        colors,
        sizes,
        brand_id,
        category_id,
        discount,
        discount_type
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
    }

    if (price_data) {
      console.log("price_data", price_data);

      const { oriCurrency, currency, oriPrice, price } = price_data;

      const oriPriceValue = oriCurrency && !isNaN(parseFloat(oriPrice)) ? parseFloat(oriPrice) : 0;
      const priceValue = price && !isNaN(parseFloat(price)) ? parseFloat(price) : 0;

      await pool.query(
        `INSERT INTO product_prices (product_id, ori_currency, currency, ori_price, price)
        VALUES ($1, $2, $3, $4, $5)`,
        [productId, oriCurrency, currency, oriPriceValue, priceValue]
      );
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