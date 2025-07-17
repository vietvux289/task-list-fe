import { Button, Input, Form, notification, Row, Col } from "antd";
import "../styles/register.css";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Register user successfully!",
        duration: 1
      });
      navigate("/login")
    } else {
      notification.error({
        message: "Register user",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ margin: "20px" }}
    >
      <h1
        style={{
          fontFamily: "Segoe UI",
          color: "#3c89e8",
          margin: "50px",
          textAlign: "center",
        }}
      >
        Register user
      </h1>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your full name!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
                message:
                  "Password must be at least 8 characters, include a number, an uppercase letter, and a special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number must start with 0 and be 10 digits",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={() => form.submit()}>
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegisterPage;
