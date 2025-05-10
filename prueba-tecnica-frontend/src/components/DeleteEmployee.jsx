import React from "react";
import "../styles/crud.css";

const DeleteEmployee = ({ selectedIds, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>¿Estás seguro de eliminar los empleados seleccionados?</h3>
        <p>
          {selectedIds.length === 1
            ? "Se eliminará 1 empleado."
            : `Se eliminarán ${selectedIds.length} empleados.`}
        </p>
        <div className="modal-buttons">
          <button className="delete-btn" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployee;
