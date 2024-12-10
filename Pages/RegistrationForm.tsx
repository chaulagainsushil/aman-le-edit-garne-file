import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import Navbar from "../Navbar";

const { Title } = Typography;

const HospitalRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Hospital Registration Data:", values);
    message.success("Hospital registered successfully!");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
    message.error("Please correct the errors before submitting.");
  };

  return (
    <Navbar>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f0f2f5",
        height: "100vh",
      }}
      >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Hospital Registration
        </Title>
        <Form
          form={form}
          name="hospital-registration-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Hospital Name */}
          <Form.Item
            label="Hospital Name"
            name="hospitalName"
            rules={[
              { required: true, message: "Please enter the hospital name!" },
            ]}
            >
            <Input placeholder="Enter hospital name" />
          </Form.Item>

          {/* PAN Number */}
          <Form.Item
            label="PAN Number"
            name="panNumber"
            rules={[
              { required: true, message: "Please enter the PAN number!" },
              {
                pattern: /^\d{10}$/,
                message: "PAN number must be exactly 10 digits.",
              },
            ]}
          >
            <Input placeholder="Enter PAN number" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter the hospital address!" },
            ]}
            >
            <Input
              placeholder="Enter address"
              maxLength={200}
              />
          </Form.Item>

          {/* Contact Number */}
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: "Please enter the contact number!" },
              {
                pattern: /^\d{10}$/,
                message: "Contact number must be exactly 10 digits.",
              },
            ]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>

          {/* Email Address */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter the email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
            >
            <Input placeholder="Enter email address" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register Hospital
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
            </Navbar>
  );
};

export default HospitalRegistrationForm;
