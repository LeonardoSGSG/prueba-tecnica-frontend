import React, { useState, useEffect } from "react";
import { fetchOfficeById, updateOffice } from "../api/api";
import "../styles/crud.css";

const EditOffice = ({ officeId, onClose, onOfficeUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const loadOffice = async () => {
      try {
        const office = await fetchOfficeById(officeId);
        setFormData(office);
        console.log(office);
      } catch (error) {
        console.error("Error al cargar el empleado:", error);
      }
    };

    loadOffice();
  }, [officeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedOffice = await updateOffice({ id: officeId, ...formData });
      onOfficeUpdated(updatedOffice);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la oficina:", error);
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
            name="address"
            placeholder="Dirección"
            value={formData.address}
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

export default EditOffice;
