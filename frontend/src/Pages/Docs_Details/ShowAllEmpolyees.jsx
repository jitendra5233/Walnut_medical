import {
  EllipsisOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  MoreOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Upload,
  message,
  Spin,
  Empty,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ id, img, name }) => {
  const navigate = useNavigate();

  const openPage = (name) => {
    navigate(name + "/" + id);
  };
  return (
    <div>
      <Card
        style={{
          borderRadius: "10px",
          padding: "1rem",
          width: "250px",
          backgroundColor: "#F0F1F6",
        }}
        className="DepCard"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {img == undefined ? (
              <img
                src="./user1.png"
                style={{ height: "72px", width: "72px", borderRadius: "100%" }}
              />
            ) : (
              <img
                src={img}
                style={{ height: "72px", width: "72px", borderRadius: "100%" }}
              />
            )}
          </div>
          <div>
            <MoreOutlined style={{ fontSize: "15px", cursor: "pointer" }} />
          </div>
        </div>
        <div style={{ margin: "20px 0" }}>
          <div>
            <span className="potionCardTitle" style={{ cursor: "pointer" }}>
              {name}
            </span>
          </div>
          <div>
            <span className="postionCardSubtitle"> Employee designation </span>
          </div>
        </div>
        <div>
          <div>
            <span className="employeeCardTxt">Status</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => openPage("/employee-details")}
            >
              <div>
                <ProfileOutlined style={{ fontSize: "20px" }} />
              </div>
              <div className="employeeCardTxt">Details</div>
            </div>
            <div style={{ cursor: "pointer" }}>
              <div>
                <FileDoneOutlined style={{ fontSize: "20px" }} />
              </div>
              <div className="employeeCardTxt">Documents</div>
            </div>
            <div style={{ cursor: "pointer" }}>
              <div>
                <LineChartOutlined style={{ fontSize: "20px" }} />
              </div>
              <div className="employeeCardTxt">Appraisal</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ShowAllEmpolyees = () => {
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getDepartment = () => {
    axios
      .get("http://localhost:5000/getHiredCandidate")
      .then((res) => {
        setAllDep(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <span className="pageTitle">All Employees</span>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Add New Department +
          </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Add New Department</span>
              </Col>
            </Row>
          </div>
        </Spin>
      </Modal>

      {allDep.length == 0 ? (
        <div style={{ padding: "8rem 0" }}>
          <Empty />
        </div>
      ) : (
        ""
      )}

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
          let { _id, f_name, l_name, profile_img } = x;
          return (
            <Col xs={24} sm={24} md={8} lg={6} key={i}>
              <EmployeeCard
                id={_id}
                img={profile_img}
                name={`${f_name} ${l_name}`}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ShowAllEmpolyees;
