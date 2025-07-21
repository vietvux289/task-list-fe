import { NavLink, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
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
import { logoutAPI } from "../../services/api.service";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  let navigate = useNavigate();

  const handleLogOut = async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Logged out!");
      navigate("/");
    }
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
      label: "",
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
              label: <span onClick={() => handleLogOut()}>Logout</span>,
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
