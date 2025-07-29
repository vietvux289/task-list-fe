import { useEffect, useState } from "react";
import { Input, notification, Modal, Select, InputNumber, Form } from "antd";
import { updateBookAPI, handleUploadFile } from "../../services/api.service";
import "../../styles/book.css";

const BookUpdateUnControlled = (props) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    dataUpdate,
    setDataUpdate,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    loadBook,
  } = props;

    useEffect(() => {
     const imgPreview = `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate?.thumbnail}`;
        if (dataUpdate) {
          form.setFieldsValue({ ...dataUpdate }),
          setPreview(imgPreview);
      }
    }, [dataUpdate]
    )
  const onFinish = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Failed to create book",
        description: "Please upload thumbnail picture!",
      });
      return;
    }

    setIsSubmitting(true);
    const resUpload = await handleUploadFile(selectedFile, "book");

    if (resUpload.data) {
      const thumbnail = resUpload.data.fileUploaded;
      const resCreate = await updateBookAPI({ ...values, thumbnail });
      if (resCreate.data) {
        notification.success({
          message: "Update book successfully!",
          description: `You have updated book ${values.mainText}!`,
        });
        await loadBook();
        resetAndCloseModal();
      } else {
        notification.error({
          message: "Failed create book",
          description: JSON.stringify(resCreate.message),
        });
      }
    } else {
      notification.error({
        message: "Failed create book",
        description: JSON.stringify(res.message),
      });
    }
    setIsSubmitting(false);
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setSelectedFile(null);
      setPreview(null);
      setDataUpdate(null);
    form.resetFields();
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

  return (
    <Modal
      title="Update book"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      okButtonProps={{ loading: isSubmitting }}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"Update"}
    >
      <Form
        form={form}
        name="create_book"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="_id" label="Id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="mainText"
          label="Book Name"
          rules={[{ required: true, message: "Book Name cannot be empty!" }]}
        >
          <Input placeholder="Enter Book name" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Author cannot be empty!" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Price cannot be empty!" },
            {
              pattern: /^[0-9]+(\.[0-9]+)?$/,
              message: "Price must be a valid number",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter price"
            addonAfter="đ"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/\D/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            { required: true, message: "Quantity cannot be empty!" },
            {
              pattern: /^[1-9]\d*$/,
              message: "Quantity must be a positive integer",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter quantity"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/\D/g, "")}
          />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            placeholder="Select category"
            style={{ width: "100%" }}
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
        </Form.Item>
      </Form>
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
    </Modal>
  );
};
export default BookUpdateUnControlled;
