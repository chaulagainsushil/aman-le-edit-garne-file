import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import React from "react";
import { PatientInformationControllerService, PatientInformationDto } from "../../services/openapi";
import Navbar from "../Navbar";

const { Title } = Typography;
const { Option } = Select;

const AddPatientForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: PatientInformationDto) => {
    console.log("Patient Data Submitted:", values);
    try{
      await PatientInformationControllerService.save(values);
      message.success("Patient data saved successfully!");
      form.resetFields();
    }
    catch{
      message.error("error while saving patient information")
    }

  
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please correct the errors before submitting.");
  };

  return (
    <Navbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9f9f9",
          padding: "20px",
          minHeight: "100vh",
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
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Add Patient Details
          </Title>
          <Form
            form={form}
            name="patient-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input the patient's first name!",
                },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input the patient's last name!",
                },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please select the patient's date of birth!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="NID Number"
              name="citizenshipNumber"
              rules={[
                {
                  required: true,
                  message: "Please input the patient's NID number!",
                },
                { pattern: /^\d+$/, message: "NID must contain only numbers." },
              ]}
            >
              <Input placeholder="Enter NID number" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please select the patient's gender!",
                },
              ]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input the patient's phone number!",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must be 10 digits.",
                },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              label="Blood Group"
              name="bloodGroup"
              rules={[
                {
                  required: true,
                  message: "Please select the patient Blood Group!",
                },
              ]}
            >
              <Select placeholder="Select Blood Group">
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
  
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <Option value="AB+">AB+</Option>
                <option value="AB-">AB-</option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Navbar>
  );
};

export default AddPatientForm;
