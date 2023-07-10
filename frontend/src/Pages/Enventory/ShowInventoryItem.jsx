import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Table,
  Modal,
  Typography,
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Space,
} from "antd";
const { Title } = Typography;
const { confirm } = Modal;
const ShowIssuedEnventory = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    form.resetFields();
    setIsModalOpen1(false);
  };

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios
      .get("http://localhost:5000/getItem")
      .then((result) => {
        let data = result.data;
        let newData = [];
        data.map((x) => {
          newData.push({
            key: x._id,
            item_name: x.item_name,
            quantity: x.quantity,
            availableItem: x.availableItem,
          });
        });

        setTableData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [updateItemId, srtUpdateIyemId] = useState([]);
  const [updateAvailableItem, setUpdateAvailableItem] = useState([]);
  const [getOldTotalItem, setOldTotalItem] = useState([]);
  const handleEdit = (id) => {
    showModal1();
    srtUpdateIyemId(id);
    tableData.map((x) => {
      if (x.key == id) {
        form.setFieldsValue({
          key: x._id,
          item_name: x.item_name,
          quantity: x.quantity,
          availableItem: x.availableItem,
        });
        setUpdateAvailableItem(x.availableItem);
        setOldTotalItem(x.quantity);
      }
    });
  };

  const handleUpdate = (values) => {
    values.id = updateItemId;
    let AvailableItem = values.quantity - getOldTotalItem;
    let FinalAvailableItem = values.availableItem + AvailableItem;
    values.availableItem = FinalAvailableItem;
    axios
      .post("http://localhost:5000/update-item", values)
      .then((res) => {
        if (res != "") {
          getInventory();
          setIsModalOpen1(false);
          handleCancel1();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed1 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleDelete = (itemId) => {
    confirm({
      title: "Delete the Issued Item",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this Issue Item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteItem(itemId);
      },
    });
  };

  const deleteItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/delete_item/${itemId}`)
      .then((response) => {
        console.log(response.data);
        setTableData((prevData) =>
          prevData.filter((item) => item.key !== itemId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (values) => {
    values.availableItem = values.quantity;
    values.lossDamageItem = 0;
    axios
      .post("http://localhost:5000/add-item", values)
      .then((res) => {
        if (res != "") {
          getInventory();
          setIsModalOpen(false);
          handleCancel();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const columns = [
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Available  Item",
      dataIndex: "availableItem",
      key: "availableItem",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Total Item",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <a onClick={() => handleEdit(record.key)}>
            {" "}
            <span>
              <EditOutlined style={{ cursor: "pointer" }} />
            </span>
          </a>
          <a onClick={() => handleDelete(record.key)}>
            {" "}
            <span>
              <DeleteOutlined style={{ cursor: "pointer" }} />
            </span>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="m12r">
        <Title level={3} className="Expensecolor">
          Total Items
        </Title>
        <button className="Expensecolorbtn" onClick={showModal}>
          Add New Items +
        </button>
        <Link to={`/add-issued`}>
          <button className="filtercolorbtn">Assign Item +</button>
        </Link>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div style={{ padding: "30px" }}>
          <Row>
            <Col span={24} style={{ marginBottom: "30px" }}>
              <span className="popupTitle">Add New Items</span>
            </Col>

            <Col span={24}>
              <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Name of item"
                      name="item_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Lable Name",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter  your Lable Name"
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Total Item"
                      name="quantity"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Total Item Quantity",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter your Total Item Quantity"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>

      <Modal
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        footer={[]}
      >
        <div style={{ padding: "30px" }}>
          <Row>
            <Col span={24} style={{ marginBottom: "30px" }}>
              <span className="popupTitle">Update Item</span>
            </Col>

            <Col span={24}>
              <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleUpdate}
                onFinishFailed={onFinishFailed1}
                autoComplete="off"
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Name of item"
                      name="item_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input Your Name Of item",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter  your Name Of item"
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Total Item"
                      name="quantity"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Total Item Quantity",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter your Total Item Quantity"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Available Item"
                      name="availableItem"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Available Item Quantity",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter your Available Item Quantity"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default ShowIssuedEnventory;
