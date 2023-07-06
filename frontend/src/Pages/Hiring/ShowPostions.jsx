import {
  PlusOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PostionCard = ({ img, name }) => {
  return (
    <div>
      <Card
        style={{ borderRadius: "10px", padding: "0", width: "330px" }}
        className="DepCard"
      >
        <div style={{ padding: "20px" }}>
          <Row>
            <Col span={12}>
              <span className="potionCardTitle">{name}</span>
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              <span
                className="postionCardSubtitle"
                style={{ margin: "0 10px" }}
              >
                Share form
              </span>
              <ShareAltOutlined />
            </Col>
            <Col span={12}>
              <span className="postionCardSubtitle">Candidate</span>
            </Col>
          </Row>
        </div>
        <div
          style={{
            backgroundColor: "#F5F6FA",
            margin: "0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            <div>Total</div>
            <div style={{ fontSize: "16px", fontWeight: "700" }}>10</div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div>
            <Row gutter={[0, 20]}>
              <Col span={12}>Experience Required:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                2 years
              </Col>
              <Col span={12}>Hiring Status:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                Non-Urgent
              </Col>
              <Col span={12}>Salary Range:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                30000
              </Col>
              <Col span={12}>Location:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                Mohali
              </Col>
              <Col span={12}>Date:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                23/4/2022
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ShowPostions = () => {
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
        message: "Server Error",
        description: "",
      });
    } else {
      api[type]({
        message: "Department Added Successful",
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
    setLoading(true);

    let data = new FormData();
    data.append("name", values.name);
    data.append("image", values.image[0].originFileObj);

    axios
      .post("http://localhost:5000/addDepartment", data)
      .then((res) => {
        setLoading(false);
        handleCancel();
        if (res.data.status === true) {
          openNotificationWithIcon("success");
          getDepartment();
        } else {
          openNotificationWithIcon("error");
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          <span className="pageTitle">Open Position</span>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Create new position +
          </Button>
        </div>
      </div>

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
        <Col xs={24} sm={24} md={8} lg={8}>
          <PostionCard img={"img"} name={"UI/UX designer"} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <PostionCard img={"img"} name={"WEB designer"} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <PostionCard img={"img"} name={"Backend Developer"} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <PostionCard img={"img"} name={"Frontend Developer"} />
        </Col>
      </Row>
    </div>
  );
};

export default ShowPostions;
