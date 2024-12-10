import { Layout, Button } from "antd";
import { LogoutOutlined, RollbackOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    const navigate = useNavigate();
    const logout=()=>{
      navigate('/');
    };
    const  back=()=>{
      navigate('/dashboard');
    };
  return (
    <>
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
          <text style={{ color: "#fff", fontSize: "20px" }}>
            dotConnect Medical History Repository
          </text>
          <div>
            <Button
              onClick={logout}
              type="link"
              icon={<LogoutOutlined />}
              style={{ color: "#fff" }}
            >
              Logout
            </Button>
            <Button
              onClick={back}
              type="link"
              icon={<RollbackOutlined />}
              style={{ color: "#fff" }}
            >
              back
            </Button>
            <span style={{ paddingTop: "4px" }}>(Patan Hospital)</span>
          </div>
        </Header>
        <div>{children}</div>
        <AppFooter></AppFooter>
      </Layout>
    </>
  );
};

export default Navbar;
