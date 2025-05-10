import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import EditEmployeeOffices from "./EditEmployeeOffices";
import { fetchEmployees } from "../api/api";
import "../styles/crud.css";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Nombre", flex: 2 },
  { field: "phoneNumber", headerName: "Teléfono", flex: 1.5 },
  { field: "dni", headerName: "DNI", flex: 1.5 },
  { field: "address", headerName: "Dirección", flex: 2 },
  { field: "birthDate", headerName: "Fecha de Nacimiento", flex: 1.5 },
];

const Employees = () => {
  const [rows, setRows] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditOfficesModalOpen, setIsEditOfficesModalOpen] = useState(false);

  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState(null);
  const [selectedEmployeeForOffices, setSelectedEmployeeForOffices] =
    useState(null);

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setRows(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleEmployeeCreated = (newEmployee) => {
    setRows((prevRows) => [...prevRows, newEmployee]);
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    setRows((prevRows) =>
      prevRows.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const actions = [
    {
      label: "Crear empleado",
      className: "create-button",
      isCreate: true,
      onClick: () => setIsCreateModalOpen(true),
    },
    {
      label: "Editar empleado",
      className: "edit-button",
      isCreate: false,
      onClick: (selectedIds) => {
        if (selectedIds.length === 1) {
          setSelectedEmployeeForEdit(selectedIds[0]);
          setIsEditModalOpen(true);
        }
      },
    },
    {
      label: "Editar oficinas",
      className: "edit-offices-button",
      isCreate: false,
      onClick: (selectedIds) => {
        if (selectedIds.length === 1) {
          setSelectedEmployeeForOffices(selectedIds[0]);
          setIsEditOfficesModalOpen(true);
        }
      },
    },
    {
      label: "Eliminar empleados",
      className: "delete-button",
      isCreate: false,
      onClick: (selectedIds) => {
        console.log("Eliminar empleados:", selectedIds);
      },
    },
  ];

  return (
    <>
      <DataTable rows={rows} columns={columns} actions={actions} />

      {isCreateModalOpen && (
        <CreateEmployee
          onClose={() => setIsCreateModalOpen(false)}
          onEmployeeCreated={handleEmployeeCreated}
        />
      )}

      {isEditModalOpen && selectedEmployeeForEdit && (
        <EditEmployee
          employeeId={selectedEmployeeForEdit}
          onClose={() => setIsEditModalOpen(false)}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
      )}

      {isEditOfficesModalOpen && selectedEmployeeForOffices && (
        <EditEmployeeOffices
          employeeId={selectedEmployeeForOffices}
          onClose={() => setIsEditOfficesModalOpen(false)}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
      )}
    </>
  );
};

export default Employees;
