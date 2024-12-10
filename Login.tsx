import React from "react";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import {
  AgencyLoginControllerService,
  AgencyLoginDto,
} from "../services/openapi";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

// Define the type for form values


const LoginPage: React.FC = () => {
  const Navigate = useNavigate();
  const onFinish = async (values: AgencyLoginDto) => {
    try {
      const response = await AgencyLoginControllerService.login(values);
      console.log(response);
      localStorage.setItem("authtoken", response.data!);
      Navigate("/dashboard");
    } catch {
      message.error("invalid credentials! Please register or use your own Username and Password");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
 

  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Login
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Enter your Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: "bold" }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: "center" }}>
            <a href="#">Forgot password?</a>
            <br />
            <a href="/register">Don't have an account? Register now</a>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
