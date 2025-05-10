import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/dataTable.css";

const DataTable = ({ rows, columns, actions }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {actions && (
        <div className="button-container">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`action-button ${action.className}`}
              onClick={() => action.onClick(selectedRows)}
              disabled={
                action.isCreate
                  ? false
                  : action.className === "edit-button" ||
                    action.className === "edit-offices-button"
                  ? selectedRows.length !== 1
                  : selectedRows.length === 0
              }
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
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) => {
            handleSelectionChange([...newSelectionModel.ids]);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
