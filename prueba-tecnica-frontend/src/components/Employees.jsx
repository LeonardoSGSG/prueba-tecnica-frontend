import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { fetchEmployees } from "../api/api";

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

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setRows(data);
    };

    loadEmployees();
  }, []);

  return <DataTable rows={rows} columns={columns} />;
};

export default Employees;
