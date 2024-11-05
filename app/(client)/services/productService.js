import axios from "axios";
const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export class ProductService {
  static async fetchProductsList() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/products`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return { ok: true, data: res.data };
    } catch (error) {
      console.error("Error fetching products list:", error);
      throw error;
    }
  }

  static async createProduct(prodName, slug,
    description, selectedCategoryId, selectedBrandId,
    selectedSizes, selectedColors, priceData, stock,
    discount, selectedDiscountType, imageUrls
  ) {
    try {
      const productData = {
        name: prodName,
        slug,
        description,
        stock_quantity: stock,
        colors: selectedColors,
        sizes: selectedSizes,
        stock: stock,
        price_data: priceData,
        brand_id: selectedBrandId,
        category_id: selectedCategoryId,
        discount,
        discount_type: selectedDiscountType,
        image_urls: imageUrls
      }

      const response = await axios.post(`${API_URL_BASE}/api/products`, productData);

      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error creating product:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`${API_URL_BASE}/api/products/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error given Id product not found:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

  static async deleteProduct(productId) {
    try {
      await fetch(`${API_URL_BASE}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return { ok: true };
    } catch (error) {
      console.error("Error deletion product:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

}

