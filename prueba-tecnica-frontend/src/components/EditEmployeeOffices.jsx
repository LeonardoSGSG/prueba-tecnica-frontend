import React, { useEffect, useState } from "react";
import { fetchOffices, updateEmployeeOffices } from "../api/api";
import "../styles/crud.css";

const EditEmployeeOffices = ({ employeeId, onClose, onEmployeeUpdated }) => {
  const [offices, setOffices] = useState([]);
  const [selectedOfficeIds, setSelectedOfficeIds] = useState([]);

  useEffect(() => {
    const loadOffices = async () => {
      try {
        const response = await fetchOffices();
        setOffices(response);

        const employeeResponse = await fetch(
          `http://localhost:8080/api/employees/${employeeId}`
        );
        const employeeData = await employeeResponse.json();

        const currentOfficeIds =
          employeeData.offices?.map((office) => office.id) || [];
        setSelectedOfficeIds(currentOfficeIds);
        console.log("offices: ", currentOfficeIds);
      } catch (error) {
        console.error("Error fetching offices or employee data:", error);
      }
    };

    loadOffices();
  }, [employeeId]);

  const handleCheckboxChange = (officeId) => {
    if (selectedOfficeIds.includes(officeId)) {
      setSelectedOfficeIds(selectedOfficeIds.filter((id) => id !== officeId));
    } else {
      setSelectedOfficeIds([...selectedOfficeIds, officeId]);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedEmployee = await updateEmployeeOffices(
        employeeId,
        selectedOfficeIds
      );
      onEmployeeUpdated(updatedEmployee);
      onClose();
    } catch (error) {
      console.error("Error updating employee offices:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Editar Oficinas del Empleado</h3>
        <div className="office-list">
          {offices.map((office) => (
            <div key={office.id} className="checkbox-container">
              <label className="modal-checkbox">
                <input
                  type="checkbox"
                  checked={selectedOfficeIds.includes(office.id)}
                  onChange={() => handleCheckboxChange(office.id)}
                />
                {office.name} - {office.address}
              </label>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button className="create-btn" onClick={handleSubmit}>
            Actualizar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeOffices;
