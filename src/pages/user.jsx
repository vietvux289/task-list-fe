import UserForm from "../components/user/user.Form";
import UserTable from "../components/user/user.Table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUsers(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable loadUser={loadUser} dataUsers={dataUsers} />
    </div>
  );
};

export default UserPage;
