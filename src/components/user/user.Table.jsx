import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, message, Popconfirm, notification } from "antd";
import UpdateUserModal from "./user.Update.Modal";
import { useState } from "react";
import ViewUserDetail from "./user.View.Detail";
import { deleteUser } from "../../services/api.service";

const UserTable = (props) => {
  const {
    dataUsers,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;

  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCancel = () => {
    notification.error({
      message: "Cancel delete user!",
      duration: 0.8,
    });
  };

  const handleConfirmDelete = async (id) => {
    const res = await deleteUser(id);
    if (res.data) {
      notification.success({
        message: "Delete user successfully!",
        description: `You have deleted user ${id}!`,
        duration: 1,
      });
      await loadUser();
    } else {
      notification.error({
        message: "Failed to delete user!",
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
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setIsModalUpdateOpen(true);
              setDataUpdate(record);
            }}
          />

          <Popconfirm
            title="Delete an user"
            description="Are you sure to delete this user?"
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
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
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
        onChange={onChange}
      />

      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUserDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
