import React from "react";
import "./Body.css";
import Header from "./Header";
import Products from "./Products";
import Checkout from "./Checkout";
import { Row, Col } from "antd";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Body = () => {
  useDocumentTitle("Dayang Store");
  
  return (
    <>
      <Header />
      
      <div className="body-container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="container-products">
              <Products />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="container-checkout">
              <Checkout />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Body;
