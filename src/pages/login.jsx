import {Form, Input, Button, Card, notification, Row, Col, message, } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginUserAPI(values.email, values.password);
    if (res.data) {
      message.success("Login successfully!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Login",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
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
      <Row style={{ width: "100%" }} justify="center">
        <Col xs={24} md={16} lg={8}>
          <Card style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "Segoe UI",
                color: "#3c89e8",
                margin: "30px",
                textAlign: "center",
              }}
            >
              Login
            </h1>
            <Form
              form={form}
              name="form_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter your email"
                  autoComplete="current-email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onPressEnter={() => onFinish()}
                />
              </Form.Item>

              <Form.Item>
                <span
                  style={{
                    color: "#3c89e8",
                    cursor: "pointer",
                    display: "inline-block",
                    marginBottom: "10px",
                    float: "right",
                  }}
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </span>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Log in
                  <LoginOutlined />
                </Button>
              </Form.Item>

              <Form.Item>
                <p style={{ margin: "0", padding: "0" }}>
                  Don't have an account{" "}
                  <span
                    style={{ color: "#3c89e8", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
