import React, { useEffect, useState } from "react";
import { fetchOffices } from "../api/api";
import DataTable from "./DataTable";

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Nombre", flex: 1 },
  { field: "address", headerName: "Dirección", flex: 1.5 },
  { field: "numberOfEmployees", headerName: "# Empleados", flex: 0.5 },
];

const Offices = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadOffices = async () => {
      const data = await fetchOffices();
      setRows(data);
    };

    loadOffices();
  }, []);

  return <DataTable rows={rows} columns={columns} />;
};

export default Offices;
