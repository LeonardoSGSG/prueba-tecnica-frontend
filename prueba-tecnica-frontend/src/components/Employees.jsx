import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import CreateEmployee from "./CreateEmployee";
import { fetchEmployees } from "../api/api";
import "../styles/style.css";

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

  const actions = [
    {
      label: "Crear empleado",
      className: "create-button",
      onClick: () => setIsCreateModalOpen(true),
    },
    {
      label: "Editar empleados",
      className: "edit-button",
      onClick: () => console.log("Editar empleados"),
    },
    {
      label: "Eliminar empleados",
      className: "delete-button",
      onClick: () => console.log("Eliminar empleados"),
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
    </>
  );
};

export default Employees;
