import axios from "axios";
const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export class BrandService {
  static async createBrand(brandName, slug, brandIcon) {
    try {
      const response = await axios.post(`${API_URL_BASE}/api/brands`, {
        name: brandName,
        slug,
        icon_url: brandIcon
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return { ok: true, data: response.data };
    } catch (error) {
      console.error("Error creating brand:", error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }

  static async fetchBrandsList() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/brands`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return { ok: true, data: res.data };
    } catch (error) {
      console.error("Error fetching brands list:", error);
      throw error;
    }
  }

  static async updateBrandById(id, brandName, slug, brandIcon) {
    try {
      const response = await axios.put(`${API_URL_BASE}/api/brands/${id}`,
        {
          name: brandName,
          slug: slug,
          icon_url: brandIcon
        },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return { ok: true, data: response.data }
    } catch (error) {
      console.error("Error updating brand with ID:", id, error);
      return {
        ok: false,
        data: error.response ? error.response.data : 'Unknown error'
      };
    }
  }

  // static async deleteBrandById(id) {
  //   try {
  //     await axios.delete(`${API_URL_BASE}/api/brands/${id}`);
  //     return { ok: true };
  //   } catch (error) {
  //     console.error("Error delete brand:", error);
  //     return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
  //   }
  // }
  static async deleteBrandById(brandId, iconUrl) {
    console.log(iconUrl);
    try {
      await fetch(`${API_URL_BASE}/api/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brandId, iconUrl }),
      });
      return { ok: true };
    } catch (error) {
      console.error('Error deleting brand:', error);
      return { ok: false, data: error.response ? error.response.data : 'Unknown error' };
    }
  }
}
