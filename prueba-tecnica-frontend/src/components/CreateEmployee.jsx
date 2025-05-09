import React, { useState } from "react";
import { createEmployee } from "../api/api";
import "../styles/crud.css";

const CreateEmployee = ({ onClose, onEmployeeCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    dni: "",
    address: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee(formData);
      onEmployeeCreated(newEmployee);
      onClose();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Crear Empleado</h3>
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
          <div className="form-group">
            <label className="form-label">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="birthDate"
              placeholder="Fecha de Nacimiento"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttons-container">
            <button className="create-btn" type="submit">
              Crear
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

export default CreateEmployee;
