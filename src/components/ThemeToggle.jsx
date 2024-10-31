// src/components/ThemeToggle.js
import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import "../styling/Toggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
      />
      <span className="theme-toggle-text" style={{ marginLeft: 8 }}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </div>
  );
};

export default ThemeToggle;
