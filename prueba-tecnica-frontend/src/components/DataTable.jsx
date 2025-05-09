import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/dataTable.css";

const DataTable = ({ rows, columns, actions }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {actions && (
        <div className="button-container">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`action-button ${action.className}`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      <Box sx={{ height: 400, width: "100%", marginTop: "10px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default DataTable;
