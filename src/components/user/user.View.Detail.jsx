import { Drawer, Button, notification } from "antd";
import "../../styles/user.detail.css";
import { useState } from "react";
import { handleUploadFile, updateUserAvatar } from "../../services/api.service";

const ViewUserDetail = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } =
    props;

  const onClose = () => {
    setIsDetailOpen(false);
    setDataDetail(null);
    setPreview(null);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
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

  const handleUpdateUserAvatar = async () => {
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateAvatar = await updateUserAvatar(
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone,
        newAvatar
      );

      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();

        notification.success({
          message: "Update new avatar",
          description: `You have updated successfully a new avatar for user ${dataDetail._id}`,
          duration: 1,
        });
      } else {
        notification.error({
          message: "Failed to update avatar!",
          description: JSON.stringify(resUpdateAvatar.message),
          duration: 0.8,
        });
      }
    } else {
      notification.error({
        message: "Failed to upload new avatar!",
        description: JSON.stringify(resUpload.message),
        duration: 0.8,
      });
    }
  };

  return (
    <Drawer
      title="User Detail"
      onClose={onClose}
      open={isDetailOpen}
    >
      {dataDetail ? (
        <div className="drawer-content">
          <p>User ID: {dataDetail?._id}</p>
          <p>Full Name: {dataDetail?.fullName}</p>
          <p>Email: {dataDetail?.email}</p>
          <p>Phone number: {dataDetail?.phone}</p>
          <p>Avatar:</p>

          <div className="user-avatar">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataDetail.avatar
              }`}
              alt="user_avatar"
            />
          </div>

          <div>
            <label htmlFor="btnUpload" className="upload-label">
              ⭱ Update avatar
            </label>
            <input
              type="file"
              hidden
              id="btnUpload"
              onChange={handleOnChangeFile}
            />
          </div>

          {preview && (
            <>
              <div className="user-avatar">
                <img src={preview} alt="updated_user_avatar" />
              </div>
              <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                Save
              </Button>
            </>
          )}
        </div>
      ) : (
        <p className="not-exist">Not exist new avatar</p>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
