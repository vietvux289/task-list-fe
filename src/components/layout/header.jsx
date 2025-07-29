import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const mainRoutes = ["home", "users", "books", "login", "register"];
  const checkCurrentRoute = (pathname) => {
    const route = mainRoutes.find((route) => `/${route}` === pathname);
    return route || "home";
  };

  const [current, setCurrent] = useState(() =>
    checkCurrentRoute(location.pathname)
  );

  useEffect(() => {
    setCurrent(checkCurrentRoute(location.pathname));
  }, [location.pathname]);

  const onClick = (e) => {
    if (e.key === "logout") return;
    setCurrent(e.key);
  };

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

  const selected = mainRoutes.includes(current) ? [current] : [];

  const leftMenuItems = [
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
      key: "books",
      icon: <ReadOutlined />,
      label: <NavLink to="/books">Books</NavLink>,
    },
  ];

  const rightMenuItems = user.id
    ? [
        {
          key: "welcome",
          icon: <IdcardOutlined />,
          label: `Welcome ${user.fullName}`,
          children: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: <span onClick={handleLogOut}>Logout</span>,
            },
          ],
        },
      ]
    : [
        {
          key: "login",
          icon: <LoginOutlined />,
          label: (
            <NavLink to="/login" style={{ color: "#000000e0" }}>
              Login
            </NavLink>
          ),
        },
        {
          key: "register",
          icon: <UserAddOutlined />,
          label: <NavLink to="/register">Register</NavLink>,
        },
      ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(128, 127, 127, 0.1)"
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={selected}
        mode="horizontal"
        items={leftMenuItems}
        style={{ borderBottom: "none" }}
      />
      <Menu
        onClick={onClick}
        selectedKeys={selected}
        mode="horizontal"
        items={rightMenuItems}
        style={{ borderBottom: "none" }}
      />
    </div>
  );
};

export default Header;
