
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getUserAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getUserAPI();
      if (res.data) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  fetchUser();
}, []);



  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
