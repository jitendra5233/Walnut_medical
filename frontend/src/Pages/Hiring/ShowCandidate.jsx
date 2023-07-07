import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostionCard = ({
  name,
  open_position,
  experience,
  type,
  salary_range,
  location,
  date,
  slug1,
  slug2,
}) => {
  const navigate = useNavigate();

  const handlelinkOpen = (slug1, slug2) => {
    navigate("/show-candidate/" + slug1 + "/" + slug2);
  };

  return (
    <div>
      <Card
        style={{ borderRadius: "10px", padding: "0", width: "330px" }}
        className="DepCard"
        onClick={() => handlelinkOpen(slug1, slug2)}
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
            <div style={{ fontSize: "16px", fontWeight: "700" }}>
              {open_position}
            </div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div>
            <Row gutter={[0, 20]}>
              <Col span={12}>Experience Required:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {experience} years
              </Col>
              <Col span={12}>Hiring Status:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {type}
              </Col>
              <Col span={12}>Salary Range:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {salary_range}
              </Col>
              <Col span={12}>Location:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {location}
              </Col>
              <Col span={12}>Date:</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {date}
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ShowCandidate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [allDep, setAllDep] = useState([]);
  const r_prams = useParams();

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
      .post("http://localhost:5000/getDepartmentPostions", { id: r_prams.id })
      .then((res) => {
        setAllDep(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSlug = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = (values) => {
    console.log(values);
    // setLoading(true);
    // values.ref_id = r_prams.id;
    // values.slug = createSlug(values.name);
    // axios
    //   .post("http://localhost:5000/addPostionsCandidate", values)
    //   .then((res) => {
    //     setLoading(false);
    //     handleCancel();
    //     form.resetFields();
    //     openNotificationWithIcon("success");
    //     getDepartment();
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //   });
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
          <span className="pageTitle">UI/UX designer</span>
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Add new Candidate +
          </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Add new Candidate</span>
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
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="f_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input First Name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your First Name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="l_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Last Name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your Last Name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your Email"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Salary"
                        name="l_salary"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Last Salary",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your Last Salary"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Expected Salary"
                        name="expected_salary"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Expected Salary",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your Expected Salary"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Experience"
                        name="experience"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Experience",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter your Experience"
                          size="small"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label="Candidate Location"
                        name="candidate_location"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Candidate Location",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter Candidate Location"
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
        </Spin>
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
          let {
            name,
            open_position,
            experience,
            type,
            salary_range,
            location,
            slug,
          } = x;

          return (
            <Col xs={24} sm={24} md={8} lg={8}>
              <PostionCard
                name={name}
                open_position={open_position}
                experience={experience}
                type={type}
                salary_range={salary_range}
                location={location}
                date={new Date(x.createdAt).toLocaleDateString()}
                slug1={r_prams.id}
                slug2={slug}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ShowCandidate;
