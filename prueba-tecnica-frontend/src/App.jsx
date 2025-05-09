import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Offices from "./components/Offices";
import Box from "@mui/material/Box";

const App = () => {
  const [activeTab, setActiveTab] = useState("Empleados");

  const renderContent = () => {
    switch (activeTab) {
      case "Empleados":
        return <Employees />;
      case "Oficinas":
        return <Offices />;
      default:
        return <Employees />;
    }
  };

  return (
    <div style={styles.container}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box sx={styles.content}>{renderContent()}</Box>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  content: {
    marginLeft: "240px",
    padding: "40px",
    width: "calc(100% - 240px)",
    height: "100vh",
    overflowY: "auto",
  },
};

export default App;
