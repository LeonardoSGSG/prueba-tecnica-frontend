import React, { useEffect, useState } from "react";
import { deleteOffice, fetchOffices } from "../api/api";
import DataTable from "./DataTable";
import CreateOffice from "./CreateOffice";
import EditOffice from "./EditOffice";
import DeleteOffice from "./DeleteOffice";

const Offices = () => {
  const [rows, setRows] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);
  const [selectedOfficesIds, setSelectedOfficesIds] = useState([]);

  useEffect(() => {
    const loadOffices = async () => {
      const data = await fetchOffices();
      setRows(data);
    };

    loadOffices();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "address", headerName: "Dirección", flex: 1.5 },
    { field: "numberOfEmployees", headerName: "# Empleados", flex: 0.5 },
  ];

  const actions = [
    {
      label: "Crear oficina",
      className: "create-button",
      isCreate: true,
      onClick: () => setIsCreateModalOpen(true),
    },
    {
      label: "Editar oficina",
      className: "edit-button",
      isCreate: false,
      onClick: (selectedIds) => {
        if (selectedIds.length === 1) {
          setSelectedOfficeId(selectedIds[0]);
          setIsEditModalOpen(true);
        }
      },
    },
    {
      label: "Eliminar oficinas",
      className: "delete-button",
      isCreate: false,
      onClick: (selectedIds) => {
        if (selectedIds.length > 0) {
          setSelectedOfficesIds(selectedIds);
          setIsDeleteModalOpen(true);
        }
      },
    },
  ];

  const handleCreate = (newOffice) => {
    setRows((prevRows) => [...prevRows, { id: Date.now(), ...newOffice }]);
  };

  const handleOfficeDeleted = async () => {
    try {
      for (const id of selectedOfficesIds) {
        await deleteOffice(id);
      }
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedOfficesIds.includes(row.id))
      );
      setIsDeleteModalOpen(false);
      setSelectedOfficesIds([]);
    } catch (error) {
      console.error("Error al eliminar empleados:", error);
    }
  };

  const handleOfficeUpdated = (updatedOffice) => {
    setRows((prevRows) =>
      prevRows.map((off) => (off.id === updatedOffice.id ? updatedOffice : off))
    );
  };
  return (
    <div>
      <DataTable rows={rows} columns={columns} actions={actions} />

      <CreateOffice
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {isEditModalOpen && selectedOfficeId && (
        <EditOffice
          onClose={() => setIsEditModalOpen(false)}
          officeId={selectedOfficeId}
          onOfficeUpdated={handleOfficeUpdated}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteOffice
          selectedIds={selectedOfficesIds}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleOfficeDeleted}
        />
      )}
    </div>
  );
};

export default Offices;
