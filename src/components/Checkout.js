import React from "react";
import { Table, Row, Col, Space, Divider } from "antd";
import {
  DeleteOutlined,
  PlusSquareFilled,
  MinusSquareFilled,
} from "@ant-design/icons";
import "./Checkout.css";
import { Button } from "antd/es/radio";

const checkoutData = [
  {
    key: "1",
    pName: "Piattos Cheese",
    pPrice: "20.00",
  },
];

const Checkout = () => {
  return (
    <>
      <div className="checkout-container">
        <h3 className="checkout-label">Checkout</h3>
        <div className="checkout-row">
          <Table
            size="small"
            columns={[
              { title: "Name", dataIndex: "pName", key: "pName", width: 50 },
              {
                title: "QTY",
                key: "pQuantity",
                render: (_, record) => (
                  <Space>
                    <MinusSquareFilled
                      style={{ color: "#125d5f75", fontSize: "14px" }}
                    />
                    <p>1</p>
                    <PlusSquareFilled
                      style={{ color: "#125c5f", fontSize: "14px" }}
                    />
                  </Space>
                ),
                width: 20,
              },
              { title: "Price", dataIndex: "pPrice", key: "pPrice", width: 20 },
              {
                title: "",
                key: "action",
                render: (_, record) => (
                  <Space>
                    <DeleteOutlined style={{ color: "#125c5f" }} />
                  </Space>
                ),
                width: 10,
              },
            ]}
            dataSource={checkoutData}
            pagination={false}
            scroll={{ y: 285, x: true}}
          />
        </div>
        <Divider style={{margin: '5px 0px 5px 0px'}}/>
        <div className="computation-container">
          <Row gutter={[0]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <div className="computation">Discount</div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="computation">0.00</div>
            </Col>
          </Row>
          <Row gutter={[0]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <div className="computation">Subtotal</div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="computation">68.00</div>
            </Col>
          </Row>
          <Row gutter={[0]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <div className="computation">Tax</div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="computation">12.00</div>
            </Col>
          </Row>
        </div>
        <Divider style={{margin: '5px 0px 5px 0px'}}/>
        <div className="total-container">
          <Row gutter={[0]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <div className="total">Total</div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="total">80.00</div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="order-container">
        <Button type="default" className="order-button">Pay ₱80.00</Button>
      </div>
    </>
  );
};

export default Checkout;
