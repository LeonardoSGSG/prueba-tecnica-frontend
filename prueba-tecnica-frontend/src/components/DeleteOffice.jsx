import React from "react";
import "../styles/crud.css";

const DeleteOffice = ({ selectedIds, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>¿Estás seguro de eliminar las oficinas seleccionadas?</h3>
        <p>
          {selectedIds.length === 1
            ? "Se eliminará 1 oficina."
            : `Se eliminarán ${selectedIds.length} oficinas.`}
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

export default DeleteOffice;
