import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  ReadOutlined,
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const { user } = useContext(AuthContext)

  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: <NavLink to="/users">Users</NavLink>,
    },
    {
      key: "products",
      icon: <ReadOutlined />,
      label: <NavLink to="/books">Books</NavLink>,
    },
    {
      key: "spacer",
      label: "", // khoảng trắng ngăn cách 2 bên
      disabled: true,
      style: { flexGrow: 1, cursor: "default" },
    },

    user.id
      ? {
          key: "welcome",
          icon: <IdcardOutlined />,
          label: `Welcome ${user.fullName}`,
          children: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: <NavLink to="/">Logout</NavLink>,
            },
          ],
        }
      : {
          key: "login",
          icon: <LoginOutlined />,
          label: (
            <NavLink to="/login" style={{ color: "#000000e0" }}>
              Login
            </NavLink>
          ),
          children: [
            {
              key: "register",
              icon: <UserAddOutlined />,
              label: <NavLink to="/register">Register</NavLink>,
            },
          ],
        },
  ];


  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ display: "flex" }}
      items={menuItems}
    />
  );
};

export default Header;
