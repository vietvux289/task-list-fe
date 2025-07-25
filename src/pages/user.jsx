import UserForm from "../components/user/user.Form";
import UserTable from "../components/user/user.Table";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, [current, pageSize]);

  const loadUser = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 150));
    const res = await fetchAllUserAPI(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
      setLoading(false)
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm loadUser={loadUser} />
      <UserTable
        loadUser={loadUser}
        loading={loading}
        dataUsers={dataUsers}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UserPage;
