import React, { useState } from "react";
import "./Header.css";
import { Space, Row, Col, Dropdown } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const adminItems = [
  {
    label: "Leona",
    key: "0",
  },
  {
    label: "Leo",
    key: "1",
  },
  {
    label: "Glenda",
    key: "3",
  },
];

const Header = () => {
  // USE STATE HOOKS
  const [adminName, setAdminName] = useState("Leona");

  // FUNCTIONS
  const handleAdminDropdown = (e) => {
    const selectedItem = adminItems.find((item) => item.key === e.key);
    if (selectedItem) {
      setAdminName(selectedItem.label);
    }
  };

  return (
    <>
      <div className="container-header">
        <Row gutter={[0, 0]}>
          <Col xs={12} sm={12} md={8} lg={6}>
            <div className="logo-container">
              <Space direction="horizontal">
                <img
                  className="logo"
                  src="https://images.vexels.com/content/301494/preview/tropical-nature-letter-d-alphabet-31396d.png"
                  alt="Pinterest"
                />
                <h2 className="title">DAYANG STORE</h2>
              </Space>
            </div>
          </Col>
          <Col xs={0} sm={0} md={8} lg={14} />
          <Col xs={12} sm={12} md={8} lg={4}>
            <div className="admin-container">
              <Space direction="horizontal">
                <Dropdown
                  menu={{
                    items: adminItems.map((item) => ({
                      ...item,
                      onClick: handleAdminDropdown,
                    })),
                  }}
                  trigger={["click"]}
                >
                  <Space>
                    <h2 className="account-name">Hello, {adminName}</h2>
                    <CaretDownFilled style={{ color: "#f0ffff" }} />
                  </Space>
                </Dropdown>
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
