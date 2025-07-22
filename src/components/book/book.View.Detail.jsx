import { Drawer } from "antd";

const ViewBookDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadBook } = props;
    const onClose = () => {
      setIsDetailOpen(false);
      setDataDetail(null);
      setPreview(null);
    };
    

  return (
    <Drawer
      title="Book Detail"
      onClose={onClose}
      open={isDetailOpen}
      maskClosable={false}
    >
      {dataDetail ? (
        <div className="drawer-content">
          <p>Book ID: {dataDetail?._id}</p>
          <p>Book Name: {dataDetail?.mainText}</p>
          <p>
            Price:{" "}
            {dataDetail?.price
              ? `${dataDetail.price.toLocaleString("vi-VN")}đ`
              : "N/A"}
          </p>
          <p>
            Quantity:{" "}
            {dataDetail?.quantity
              ? dataDetail.quantity.toLocaleString("vi-VN")
              : "N/A"}
          </p>

          <p>Thumbnail:</p>

          <div className="user-avatar">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                dataDetail.thumbnail
              }`}
              alt="book-thumbnail"
            />
          </div>
        </div>
      ) : (
        <p className="not-exist">Not exist data</p>
      )}
    </Drawer>
  );
};

export default ViewBookDetail;
