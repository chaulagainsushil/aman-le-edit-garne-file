import React, { useState } from "react";
import {
  Layout,
  Input,
  Button,
  Table,
  Tabs,
  Form,
  Spin,
  message,
  Card,
  Dropdown,
  Menu,
  Typography,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  LogoutOutlined,
  UserAddOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import AppFooter from "./AppFooter";
import {
  CheckUpInformationControllerService,
  CheckUpInformationDto,
  DiagnosisInformationControllerService,
  DiagnosisInformationDto,
  MedicationControllerService,
  MedicationDto,
  PatientInformationControllerService,
  PatientInformationDto,
} from "../services/openapi";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Text, Link } = Typography;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [medication, setMedication] = useState<MedicationDto[]>([]);
  const [checkups, setCheckups] = useState<CheckUpInformationDto[]>([]);
  const [diagnosis, setDiagnosis] = useState<DiagnosisInformationDto[]>([]);
  const [patientData, setPatientData] = useState<PatientInformationDto | null>(
    null
  );
  // const Dashboard: React.FC = () => {
    const Navigate = useNavigate();
  
    const handleButtonClick = () => {
      Navigate('/AddPatient');
    };

  // Simulated logged-in agency

  const onSearch = async (_values: {
    lastName: string;
    dob: string;
    nationalId: string;
  }) => {
    setLoading(true);
    try {
      const patient = await PatientInformationControllerService.get(
        _values.lastName,
        _values.dob,
        _values.nationalId
      );
      const dto = patient as PatientInformationDto;
      setPatientData(patient as PatientInformationDto);

      const medication = await MedicationControllerService.get1(dto.patientId);
      setMedication(medication);

      const checkups = await CheckUpInformationControllerService.getall(
        dto.patientId
      );
      setCheckups(checkups);

      const diagnosis = await DiagnosisInformationControllerService.get2(
        dto.patientId
      );
      setDiagnosis(diagnosis);
    } catch {
      message.error("could not fine patient information");
    } finally {
      console.log(setLoading(false));
    }
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1">Add Medication</Menu.Item>
      <Menu.Item key="2">Add Diagnosis</Menu.Item>
      <Menu.Item key="3">Add Checkup</Menu.Item>
    </Menu>
  );

  const columnsMedication = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Medication Name",
      dataIndex: "medicationName",
      key: "medicineName",
    },
    { title: "Frequency", dataIndex: "frequency", key: "frequency" },
  ];

  const columnsCheckups = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Medicine Name", dataIndex: "medicineName", key: "medicineName" },
    { title: "frequency", dataIndex: "frequency", key: "frequency" },
  ];

  const columnsDiagnosis = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Diagnosis Name",
      dataIndex: "diagnosisName",
      key: "diagnosisName",
    },
    { title: "Result", dataIndex: "result", key: "result" },
  ];

  const  back=()=>{
    Navigate('/');
  };

  return (
    <Layout style={{ height: "100vh", background: "#f0f2f5" }}>
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Text style={{ color: "#fff", fontSize: "20px" }}>
          dotConnect Medical History Repository
        </Text>
        <div>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#fff" }}
            onClick={back}

          >
            Logout
          </Button>
          <Button
            type="link"
            onClick={back}
            icon={<RollbackOutlined />}
            style={{ color: "#fff" }}
          >
            back
          </Button>
          <span style={{ paddingTop: "4px" }}>(Patan Hospital)</span>
        </div>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Card className=" d-flex justify-content-center">
          <Form layout="inline" onFinish={onSearch}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Enter last name" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="DOB"
              name="dob"
              rules={[{ required: true, message: "Enter date of birth" }]}
            >
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="National ID"
              name="nationalId"
              rules={[{ required: true, message: "Enter National ID" }]}
            >
              <Input placeholder="National ID" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
            >
              Search
            </Button>
          </Form>
        </Card>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : patientData ? (
          <Card style={{ marginTop: "20px" }} title="Patient Information">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)", // Two columns
                  gap: "10px 20px", // Row and column gaps
                  flexGrow: 1,
                }}
              >
                <div>
                  <b>First Name:</b> {patientData.firstName}
                </div>
                <div>
                  <b>Last Name:</b> {patientData.lastName}
                </div>
                <div>
                  <b>Gender:</b> {patientData.gender}
                </div>
                <div>
                  <b>DOB:</b> {patientData.dateOfBirth}
                </div>
                <div>
                  <b>Blood Group:</b> {patientData.bloodGroup}
                </div>
                <div>
                  <b>National ID:</b> {patientData.citizenshipNumber}
                </div>
              </div>
              <Dropdown
                overlay={dropdownMenu}
                trigger={["click"]}
                // style={{ alignSelf: "flex-start" }}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Add
                </Button>
              </Dropdown>
            </div>

            <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
              <TabPane tab="Medications" key="1">
                <Table
                  dataSource={medication.map((med, index) => ({
                    key: index,
                    date: med.date,
                    medicineName: med.medicineName,
                    frequency: med.frequency,
                  }))}
                  columns={columnsMedication}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Diagnosis" key="2">
                <Table
                  dataSource={diagnosis.map((diag, index) => ({
                    key: index,
                    date: diag.date,
                    diagnosisName: diag.diagnosisName,
                    result: diag.result,
                  }))}
                  columns={columnsCheckups}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Checkups" key="3">
                <Table
                  dataSource={checkups.map((check, index) => ({
                    key: index,
                    dateVisited: check.dateVisited,
                    reason: check.reason,
                    followUpDate: check.followUpDate,
                  }))}
                  columns={columnsDiagnosis}
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </Card>
        ) : (
          <Card style={{ marginTop: "20px", textAlign: "center" }}>
            <Text type="warning" style={{ fontSize: "16px" }}>
              No patient found!
            </Text>
            <div style={{ marginTop: "10px" }}>
              <Link href="#">
                <Button type="primary" onClick={handleButtonClick} icon={<UserAddOutlined />}>
                  Add New Patient
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </Content>
      <AppFooter></AppFooter>
    </Layout>
  );
};

export default Dashboard;
