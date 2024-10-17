import axios from "axios";
import { color } from "framer-motion";

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export class CategoryService {
  static async fetchCategories() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/categories`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return { ok: true, data: res.data };
    } catch (error) {
      console.error("Error fetching categories list:", error);
      throw error;
    }
  }

  static async createCategory(categoryName, categoryColor) {
    try {
      const response = await axios.post(`${API_URL_BASE}/api/categories`, {
        title: categoryName,
        color: categoryColor,
      });

      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error creating category:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

  static async getCategoryById(id) {
    try {
      const response = await axios.get(`${API_URL_BASE}/api/categories/${id}`);
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error given Id category not found:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

  static async updateCategoryById(id, categoryName, categoryColor) {
    try {
      const response = await axios.put(`${API_URL_BASE}/api/categories/${id}`,
        {
          title: categoryName,
          color: categoryColor
        }
      );
      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error updating category with ID:", id, error);
      return {
        ok: false,
        data: error.response ? error.response.data : 'Unknown error'
      };
    }
  }


  static async deleteCategoryById(id) {
    try {
      await axios.delete(`${API_URL_BASE}/api/categories/${id}`);
      return { ok: true };
    } catch (error) {
      console.error("Error delete category:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }
}