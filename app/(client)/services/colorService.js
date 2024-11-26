import axios from "axios";
const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export class ColorService {
  static async fetchColorsList() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/colors`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return { ok: true, data: res.data };
    } catch (error) {
      console.error("Error fetching colors list:", error);
      throw error;
    }
  }
}
