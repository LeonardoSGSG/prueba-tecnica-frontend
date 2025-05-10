import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import { createOffice } from "../api/api";

const CreateOffice = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOffice = await createOffice(formData);
      onCreate(newOffice);
      onClose();
    } catch (error) {
      console.error("Error creating office:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          padding: 24,
          backgroundColor: "#fff",
          margin: "100px auto",
          width: 320,
          borderRadius: 8,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Crear Oficina</h2>
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Dirección"
          name="address"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          style={{ marginBottom: 16 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ width: "100%" }}
        >
          Crear
        </Button>
      </div>
    </Modal>
  );
};

export default CreateOffice;
