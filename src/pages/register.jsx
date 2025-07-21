import {
  Button,
  Input,
  Form,
  notification,
  Row,
  Col,
  Card
} from "antd";
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
    <div
      style={{
        backgroundColor: "#f7f9fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontFamily: "Segoe UI",
            color: "#3c89e8",
            margin: "30px",
            textAlign: "center",
          }}
        >
          Register user{" "}
        </h1>

        <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]} style={{ rowGap: "10px" }}>
            <Col span={24}>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
                    message:
                      "At least 8 characters, one uppercase letter, one number, and one special character.",
                  },
                ]}
              >
                <Input.Password placeholder="Create a secure password" />
              </Form.Item>
            </Col>

            <Col span={24}>
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
                    message: "Must start with 0 and contain 10 digits",
                  },
                ]}
              >
                <Input placeholder="0123456789" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item style={{ marginBottom: 25 }}>
                <Button type="primary" block onClick={() => form.submit()}>
                  Register
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <span
              style={{ color: "#3c89e8", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Back to homepage
            </span>

            <p>
              Have account.{" "}
              <span
                style={{ color: "#3c89e8", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Login here
              </span>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
