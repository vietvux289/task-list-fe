import { DownOutlined } from "@ant-design/icons";
import { Table, Space } from "antd";
import React from "react";

const BookTable = () => {
  const dataSource = [
    {
      key: "no",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "Id",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Book Name",
      dataIndex: "bname",
      key: "bname",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },

    {
      title: "Action",
      key: "operation",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
          <Dropdown menu={{ items }}>
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default BookTable;
