import { UploadOutlined } from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Avatar,
  notification,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DepartmentCard = ({ img, name }) => {
  return (
    <div>
      <Card style={{ borderRadius: "10px", padding: "0" }} className="DepCard">
        <div style={{ padding: "60px 70px", textAlign: "center" }}>
          <img src={img} style={{ height: "100px", width: "100px" }} />
        </div>
        <div style={{ backgroundColor: "#F5F6FA" }}>
          <div
            style={{
              textAlign: "center",
              padding: "15px",
            }}
          >
            <span>{name}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const HiringDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [allDep, setAllDep] = useState([]);

  useEffect(() => {
    getDepartment();
  }, []);

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      api[type]({
        message: "Invalid Email or Password",
        description: "",
      });
    } else {
      api[type]({
        message: "Login Successful",
        description: "",
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDepartment = () => {
    axios
      .get("http://localhost:5000/getDepartment")
      .then((res) => {
        setAllDep(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (values) => {
    values.img = "./icon/Hr_icon.png";
    setLoading(true);
    axios
      .post("http://localhost:5000/addDepartment", values)
      .then((res) => {
        setLoading(false);
        if (res.data.length === 0) {
          openNotificationWithIcon("error");
        } else {
          console.log(res.data);
          openNotificationWithIcon("success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <span className="pageTitle">Department in Techies Infotech</span>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Add New Department +
          </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <div style={{ padding: "30px" }}>
          <Row>
            <Col span={24} style={{ marginBottom: "30px" }}>
              <span className="popupTitle">Add New Department</span>
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
                  <Col span={24} style={{ marginBottom: "20px" }}>
                    {/* <Avatar
                      size={50}
                      src={<img src="./icon/userImg.png" alt="avatar" />}
                      style={{ marginRight: "  15px" }}
                    />
                    <Button>
                      Upload <UploadOutlined />
                    </Button> */}
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Department name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Department name",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter your Department name"
                        size="small"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>
      <Row
        gutter={[
          {
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          },
          20,
        ]}
      >
        {allDep.map((x, i) => {
          let { img, name } = x;
          return (
            <Col xs={24} sm={24} md={8} lg={6} key={i}>
              <DepartmentCard img={img} name={name} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HiringDashboard;
