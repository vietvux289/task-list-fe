import { useEffect, useState } from "react";
import { Input, notification, Modal, Select, InputNumber, message } from "antd";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import "../../styles/book.css";

const UpdateBookControlled = (props) => {
  const [id, setId] = useState("")
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;
  useEffect(() => {
    const imgPreview = `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate?.thumbnail}`;
    if (dataUpdate) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(imgPreview);
    }
  }, [dataUpdate]);
  const handleSubmitBtn = async () => {
    const uploadImg = await handleUploadFile(selectedFile, "book");
    if (uploadImg.data) {
      let newThumbnail = uploadImg.data.fileUploaded;
      const res = await updateBookAPI({
        _id: id,
        mainText,
        author,
        price,
        quantity,
        category,
        thumbnail: newThumbnail,
      });
      if (res.data) {
        notification.success({
          message: "Updated book!",
          description: `You have updated book ${mainText}!`,
        });
        await loadBook();
        resetAndCloseModal();
      } else {
        notification.error({
          message: "Failed to update book!",
          description: JSON.stringify(res.message),
        });
      }
    } else {
      notification.error({
        message: "Failed to update!",
        description: JSON.stringify(uploadImg.message)
      })
    }
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setBookName("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory(null);
    setSelectedFile(null);
    setThumbnail("")
    setPreview(null);
    setDataUpdate(null)
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
      title="Update book"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"Update"}
    >
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>Book Name</span>
          <Input
            required
            value={mainText}
            onChange={(event) => {
              setMainText(event.target.value);
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
            addonAfter="₫"
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
export default UpdateBookControlled;