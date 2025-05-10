import React, { useState } from "react";
import "../styles/navbar.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Empleados", "Oficinas"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <button className="menu-toggle" onClick={toggleMenu}>
        {activeTab} {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        {navItems.map((item, index) => (
          <button
            className={`nav-button ${item === activeTab ? "active" : ""}`}
            key={index}
            onClick={() => {
              setActiveTab(item);
              setIsOpen(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
