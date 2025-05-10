import React, { useEffect, useState } from "react";
import { updateEmployee, fetchEmployeeById } from "../api/api";
import "../styles/crud.css";

const EditEmployee = ({ employeeId, onClose, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    dni: "",
    address: "",
    birthDate: "",
  });

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const employee = await fetchEmployeeById(employeeId);
        setFormData(employee);
      } catch (error) {
        console.error("Error al cargar el empleado:", error);
      }
    };

    loadEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = await updateEmployee(employeeId, formData);
      onEmployeeUpdated(updatedEmployee);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Editar Empleado</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Teléfono"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button className="create-btn" type="submit">
              Actualizar
            </button>
            <button className="cancel-btn" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
