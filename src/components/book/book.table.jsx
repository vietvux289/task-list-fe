import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification, Button } from "antd";
import { useState } from "react";
import ViewBookDetail from "./book.View.Detail";
import { deleteBook } from "../../services/api.service";
import UpdateBookControlled from "./book.Update.Controlled";
import BookUpdateUnControlled from "./book.Update.Uncontrolled";

const BookTable = (props) => {
  const {
    dataBooks,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
    loadBook,
    setIsModalOpen,
  } = props;

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleCancel = () => {
    notification.error({
      message: "Canceled delete this book!",
      duration: 0.8,
    });
  };

  const handleConfirmDelete = async (id) => {
    const res = await deleteBook(id);
    if (res.data) {
      notification.success({
        message: "Delete book!",
        description: `You have deleted book ${id} successfully!`,
        duration: 1,
      });
      await loadBook();
    } else {
      notification.error({
        message: "Failed to delete book!",
        description: JSON.stringify(res.message),
        duration: 1,
      });
    }
  };

  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <>{(current - 1) * pageSize + (index + 1)}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setIsDetailOpen(true);
              setDataDetail(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Book name",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value) => new Intl.NumberFormat("vi-VN").format(value),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Edit action */}
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setIsModalUpdateOpen(true);
              setDataUpdate(record);
            }}
          />

          {/* Delete action */}
          <Popconfirm
            title="Delete an book"
            description="Are you sure to delete this book?"
            onConfirm={() => {
              handleConfirmDelete(record._id);
            }}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            placement="right"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (+pagination.current !== current) {
        setCurrent(+pagination.current);
      }
    }

    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h3 style={{ fontFamily: "Segoe UI" }}>Table books</h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create book
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey={"_id"}
        onChange={onChange}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]}/total {total}
              </div>
            );
          },
          style: {
            display: "flex",
            justifyContent: "center",
          },
        }}
      />

      <ViewBookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadBook={loadBook}
      />

      <BookUpdateUnControlled
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />
    </>
  );
};

export default BookTable;
