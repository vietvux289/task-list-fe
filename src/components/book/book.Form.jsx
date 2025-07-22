import { useState } from "react";
import { Input, notification, Modal } from "antd";
import { createBookAPI } from "../../services/api.service";

const BookForm = (props) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
    const { isModalOpen, setIsModalOpen } = props;
    

    const handleSubmitBtn = async () => {
      const res = await createBookAPI(bookName, author, price, quantity, category);
      if (res.data) {
        notification.success({
          message: "Create book",
          description: "Created new successfully!",
        });
        resetAndCloseModal();
        await loadBook();
      } else
        notification.error({
          message: "Error create book",
          description: JSON.stringify(res.message),
        });
    };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setBookName("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
  };

  return (
    <Modal
      title="Create new book"
      open={isModalOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"Create"}
    >
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div>
          <span>Book Name</span>
          <Input
            value={bookName}
            onChange={(event) => {
              setBookName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Author</span>
          <Input
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Price</span>
          <Input
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Quantity</span>
          <Input
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Category</span>
          <Input
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default BookForm;
