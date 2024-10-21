import React, { useEffect, useState } from "react";
import "./Products.css";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Tooltip,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import axios from "axios";
const { Search } = Input;

const Products = () => {
  const [form] = Form.useForm();

  // USE STATE HOOKS
  const [productType, setProductType] = useState("1");
  const [allProductData, setAllProductData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [nameToAdd, setNameToAdd] = useState("");
  const [typeToAdd, setTypeToAdd] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [priceToAdd, setPriceToAdd] = useState("");
  const [supplierToAdd, setSupplierToAdd] = useState("");

  // FUNCTIONS
  const handleTabChange = (activeKey) => {
    setProductType(activeKey);
  };
  const showAddModal = () => {
    setIsAddModalOpen(true);
    clearData();
  };
  const showUpdateModal = () => {
    setIsUpdatedModalOpen(true);
    clearData();
  };
  const handleCancel = () => {
    setIsAddModalOpen(false);
    setIsUpdatedModalOpen(false);
  };
  const clearData = () => {
    form.resetFields();
    setNameToAdd(null);
    setTypeToAdd(null);
    setQuantityToAdd(null);
    setPriceToAdd(null);
    setSupplierToAdd(null);
  };

  // AXIOS
  const getAll = () => {
    axios
      .get("http://localhost:8000/api/getAll")
      .then((response) => {
        setAllProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const getProducts = (productType) => {
    setTabLoading(true);

    axios
      .post(`http://localhost:8000/api/getStoreProducts`, {
        productType: productType,
      })
      .then((response) => {
        const data = response.data;
        setProductData(data);
        setTabLoading(false);
        console.log(data);
      })
      .catch((err) => {});
  };

  const insertNewProduct = () => {
    axios
      .post(`http://localhost:8000/api/insertStoreProduct`, {
        // left backend, right react
        pName: nameToAdd,
        pType: typeToAdd,
        pQuantity: quantityToAdd,
        pPrice: priceToAdd,
        sCode: supplierToAdd,
      })
      .then((response) => {
        if (response.data === "existing") {
          message.error("Product already exists.");
        } else {
          // clearData();
          setIsAddModalOpen(false);
          message.success("Product successfully added.");
          getProducts(productType);
        }
      })
      .catch((err) => {});
  };

  // const editProduct = () => {};

  useEffect(() => {
    getProducts(productType);
  }, [productType]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="products-container">
        <div className="products-header">
          <Row gutter={[0]}>
            <Col xs={12} sm={12} md={16} lg={16}>
              <Button
                type="text"
                className="button-additem"
                onClick={showAddModal}
              >
                <PlusOutlined style={{ color: "#125c5f" }} />
                ADD NEW ITEM
              </Button>
              <Button
                type="text"
                className="button-additem"
                onClick={showUpdateModal}
              >
                <EditFilled style={{ color: "#125c5f" }} />
                UPDATE LIST
              </Button>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#125c5f",
                    fontFamily: "'Poppins', sans-serif",
                  },
                }}
              >
                <Search
                  style={{ width: "100%" }}
                  showSearch
                  allowClear
                  placeholder="Search a product"
                />
              </ConfigProvider>
            </Col>
          </Row>
        </div>

        {/* ADD MODAL */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#125c5f",
              colorBgContainer: "#32a99322",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          <Modal
            title="Add a New Product"
            open={isAddModalOpen}
            onOk={() => form.submit()}
            onCancel={() => {
              handleCancel();
            }}
          >
            <Form
              form={form}
              style={{ paddingTop: 20 }}
              onFinish={insertNewProduct}
            >
              <Form.Item
                label="Product Name:"
                name="name"
                rules={[
                  { required: true, message: "Product name is required" },
                ]}
              >
                <Input
                  placeholder="ex. Piattos"
                  allowClear
                  style={{
                    width: "100%",
                    verticalAlign: "baseline",
                  }}
                  value={nameToAdd}
                  onChange={(e) => {
                    setNameToAdd(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Type:"
                name="type"
                rules={[
                  { required: true, message: "Product type is required" },
                ]}
              >
                <Select
                  placeholder="Select a Product Type"
                  style={{ width: "100%", verticalAlign: "baseline" }}
                  options={[
                    {
                      value: "Snacks",
                    },
                    {
                      value: "Canned Goods",
                    },
                  ]}
                  value={typeToAdd}
                  onChange={(e) => {
                    setTypeToAdd(e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Quantity:"
                name="quantity"
                rules={[
                  { required: true, message: "Product quantity is required" },
                ]}
              >
                <InputNumber
                  placeholder="ex. 20"
                  min={1}
                  max={50}
                  allowClear
                  style={{
                    width: "100%",
                    verticalAlign: "baseline",
                  }}
                  defaultValue={0}
                  onChange={(value) => {
                    setQuantityToAdd(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Price:"
                name="price"
                rules={[
                  { required: true, message: "Product price is required" },
                ]}
              >
                <InputNumber
                  prefix="₱"
                  placeholder="ex. 100"
                  min={1}
                  max={500}
                  allowClear
                  style={{
                    width: "100%",
                    verticalAlign: "baseline",
                  }}
                  defaultValue={0}
                  onChange={(value) => {
                    setPriceToAdd(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Supplier:"
                name="supplier"
                rules={[
                  { required: true, message: "Supplier name is required" },
                ]}
              >
                <Select
                  placeholder="Select a Supplier"
                  style={{ width: "100%", verticalAlign: "baseline" }}
                  options={[
                    {
                      label: "Puregold",
                      value: "2024001",
                    },
                    {
                      label: "Waltermart",
                      value: "2024002",
                    },
                    {
                      label: "Wet Market",
                      value: "2024003",
                    },
                  ]}
                  value={supplierToAdd}
                  onChange={(e) => {
                    setSupplierToAdd(e);
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </ConfigProvider>

        {/* UPDATE MODAL */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#125c5f",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          <Modal
            title="Update List"
            open={isUpdateModalOpen}
            onCancel={() => {
              handleCancel();
            }}
            width={800}
            footer={null}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#125c5f",
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            >
              <Search
                style={{ width: 300 }}
                showSearch
                allowClear
                placeholder="Search a product"
                // onChange={}
              />
              <Table
                size="small"
                style={{ paddingTop: 20 }}
                columns={[
                  { title: "Name", dataIndex: "pName", key: "pName" },
                  { title: "Type", dataIndex: "pType", key: "pType" },
                  {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                    width: 120,
                    render: (_, record) => (
                      <Space>
                        <Tooltip title="Edit">
                          <EditFilled
                            style={{
                              color: "#125c5f",
                              fontSize: "14px",
                              marginRight: 20,
                            }}
                          />
                        </Tooltip>
                        <Popconfirm
                          title="Delete Product?"
                          description={
                            "Are you sure you want to delete this product?"
                          }
                          // onConfirm={() => {
                          //   if (record.isactive === "1") {
                          //     confirmChangeStatus(record, 0);
                          //   } else if (record.isactive === "0") {
                          //     confirmChangeStatus(record, 1);
                          //   }
                          // }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Tooltip title="Delete">
                            <DeleteFilled
                              style={{ color: "#125c5f", fontSize: "14px" }}
                            />
                          </Tooltip>
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
                dataSource={allProductData}
                scroll={{ y: 280 }}
                pagination={{pageSize: 10, defaultCurrent: 1}}
              />
            </ConfigProvider>
          </Modal>
        </ConfigProvider>

        <div className="tabs-container">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ffffff",
                colorPrimaryHover: "#125c5f",
                colorBgContainer: "#125c5f",
                fontFamily: "'Poppins', sans-serif",
              },
            }}
          >
            <Tabs
              defaultActiveKey="1"
              type="card"
              onChange={handleTabChange}
              items={[
                {
                  label: "All",
                  key: "1",
                  children: (
                    <Spin
                      spinning={tabLoading}
                      tip="Loading products..."
                      size="small"
                    >
                      <div className="tab-div">
                        <Row gutter={[0, 0]}>
                          {productData.map((product) => (
                            <Col
                              key={product.pCode}
                              className="gutter-row"
                              span={6}
                            >
                              <Space direction="vertical">
                                <div
                                  style={{ padding: "10px", height: "auto" }}
                                  className="grid-product"
                                >
                                  <img
                                    src="https://corinthiandistributors.com/wp-content/uploads/2020/03/F8.png"
                                    alt="Piattos"
                                    style={{
                                      width: "120px",
                                      height: "120px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  <p className="product-text">
                                    {product.pName}
                                  </p>
                                  <h4
                                    className="product-text"
                                    style={{ color: "#1c6261" }}
                                  >
                                    ₱{product.pPrice}
                                  </h4>
                                </div>
                              </Space>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Spin>
                  ),
                },
                {
                  label: "Snacks",
                  key: "2",
                  children: (
                    <Spin
                      spinning={tabLoading}
                      tip="Loading products..."
                      size="small"
                    >
                      <div className="tab-div">
                        <Row gutter={[0, 0]}>
                          {productData.map((product) => (
                            <Col
                              key={product.pCode}
                              className="gutter-row"
                              span={6}
                            >
                              <Space direction="vertical">
                                <div
                                  style={{ padding: "10px", height: "auto" }}
                                  className="grid-product"
                                >
                                  <img
                                    src="https://corinthiandistributors.com/wp-content/uploads/2020/03/F8.png"
                                    alt="Piattos"
                                    style={{
                                      width: "120px",
                                      height: "120px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  <p className="product-text">
                                    {product.pName}
                                  </p>
                                  <h4
                                    className="product-text"
                                    style={{ color: "#1c6261" }}
                                  >
                                    ₱{product.pPrice}
                                  </h4>
                                </div>
                              </Space>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Spin>
                  ),
                },
                {
                  label: "Canned Goods",
                  key: "3",
                  children: (
                    <Spin
                      spinning={tabLoading}
                      tip="Loading products..."
                      size="small"
                    >
                      <div className="tab-div">
                        <Row gutter={[0, 0]}>
                          {productData.map((product) => (
                            <Col
                              key={product.pCode}
                              className="gutter-row"
                              span={6}
                            >
                              <Space direction="vertical">
                                <div
                                  style={{ padding: "10px", height: "auto" }}
                                  className="grid-product"
                                >
                                  <img
                                    src="https://megaprimefoods.com.ph/wp-content/uploads/2021/03/Mega-Sardines-in-Tomato-Sauce-425g-1.jpg"
                                    alt="Piattos"
                                    style={{
                                      width: "120px",
                                      height: "120px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  <p className="product-text">
                                    {product.pName}
                                  </p>
                                  <h4
                                    className="product-text"
                                    style={{ color: "#1c6261" }}
                                  >
                                    ₱{product.pPrice}
                                  </h4>
                                </div>
                              </Space>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Spin>
                  ),
                },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default Products;
