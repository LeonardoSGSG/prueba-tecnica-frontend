import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export const fetchOffices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/offices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching offices:", error);
    return [];
  }
};
