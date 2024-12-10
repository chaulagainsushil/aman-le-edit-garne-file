import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#001529",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="d-flex justify-content-center"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Text style={{ color: "#fff" }}>
          © {new Date().getFullYear()} dotConnect Medical History Repository.
          All rights reserved.
        </Text>
      </div>
    </Footer>
  );
};

export default AppFooter;
