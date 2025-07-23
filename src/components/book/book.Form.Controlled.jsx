import { useState } from "react";
import { Input, notification, Modal, Select, InputNumber } from "antd";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import "../../styles/book.css";

const BookFormControlled = (props) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { isModalOpen, setIsModalOpen, loadBook } = props;

  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Failed to create book",
        description: "Please upload thumbnail picture!",
      });
      return;
    }

    const resUpload = await handleUploadFile(selectedFile, "book");
    if (!resUpload.data) {
      notification.error({
        message: "Failed to upload thumbnail",
        description: JSON.stringify(resUpload.message),
      });
    }
    const fileUploaded = resUpload.data.fileUploaded;
    const res = await createBookAPI(
      bookName,
      author,
      +price,
      +quantity,
      category,
      fileUploaded
    );
    if (res.data) {
      notification.success({
        message: "Create book",
        description: "Created new successfully!",
        duration: 0.5,
      });
      resetAndCloseModal();
      await loadBook();
    } else {
      notification.error({
        message: "Error create book",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setBookName("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory(null);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files && event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    let file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChangeOption = (value) => {
    setCategory(value);
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
            required
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
          <InputNumber
            value={price}
            prefix="₫"
            style={{ width: "100%" }}
            onChange={(value) => setPrice(value)}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/\D/g, "")}
          />
        </div>
        <div>
          <span>Quantity</span>
          <InputNumber
            value={quantity}
            style={{ width: "100%" }}
            onChange={(value) => setQuantity(value)}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/\D/g, "")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Category</span>
          <Select
            value={category}
            placeholder="Choose category"
            style={{ width: "100%" }}
            onChange={handleChangeOption}
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </div>
        <div>
          <label htmlFor="btnUpload" className="upload-label">
            ⭱ Upload thumbnail
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            onChange={handleOnChangeFile}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </div>
        {preview && (
          <div className="thumbnail">
            <img src={preview} alt="updated_user_avatar" />
          </div>
        )}
      </div>
    </Modal>
  );
};
export default BookFormControlled;
