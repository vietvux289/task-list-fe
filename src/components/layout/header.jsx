import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const Header = () => {
const [current, setCurrent] = useState("home");
const onClick = (e) => {
  console.log("click ", e);
  setCurrent(e.key);
};

const items = [
  {
    label: <NavLink to="/"> Home </NavLink>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to="/users">Users</NavLink>,
    key: "users",
    icon: <UserOutlined />,
  },
  {
    label: <NavLink to="/books">Books</NavLink>,
    key: "products",
    icon: <ProductOutlined />,
  },
];

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
};

export default Header;
