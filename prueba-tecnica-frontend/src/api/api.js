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
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};
export const updateEmployeeOffices = async (employeeId, officeIds) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/employees/${employeeId}/offices`,
      officeIds
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee offices:", error);
    throw error;
  }
};
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/employees/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    throw error;
  }
};
export const fetchEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    return null;
  }
};
