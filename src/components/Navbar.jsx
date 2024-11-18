import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import "../styling/NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    {
      key: "/client-dashboard-login",
      icon: <UserOutlined />,
      label: "Client Login",
    },
    {
      key: "/contractor-dashboard-login",
      icon: <UserOutlined />,
      label: "Contractor Login",
    },
    {
      key: "/admin-dashboard",
      icon: <DashboardOutlined />,
      label: "Create A Profile",
    },
  ];

  const handleClick = (info) => {
    const { key } = info;
    navigate(key);
  };

  return (
    <nav className="nav-container">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        className="mini-nav-bar"
        onClick={handleClick}
        items={menuItems}
        style={{ touchAction: "manipulation" }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="nav-item">
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};

export default NavBar;
