import { Drawer } from "antd";

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } =
    props;

  const onClose = () => {
    setIsDetailOpen(false);
    setDataDetail(null);
  };

  return (
    <Drawer title="User Detail" onClose={onClose} open={isDetailOpen}>
      {dataDetail ? (
        <>
          <p>Id: {dataDetail?._id}</p>
          <p>FullName: {dataDetail?.fullName}</p>
          <p>Email: {dataDetail?.email}</p>
          <p>Phone number: {dataDetail?.phone}</p>
        </>
      ) : (
        <>
          <p>Not exist data</p>
        </>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
