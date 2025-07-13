import UserForm from "../components/user/user.Form";
import UserTable from "../components/user/user.Table";

const UserPage = () => {
  return (
  <div style={{padding: "20px"}}>
    <UserForm />
    <UserTable />
  </div>
  )
};

export default UserPage;
