import React, { useEffect, useState } from "react";
import {
  DownloadOutlined,
  FileTextOutlined,
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
  notification,
  Upload,
  message,
  Spin,
  DatePicker,
  TimePicker,
  Popconfirm,
  Alert,
} from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostionCard = ({
  id,
  f_name,
  name,
  email,
  experience,
  l_salary,
  expected_salary,
  location,
  cv_link,
  interview,
}) => {
  const [interviewModal, setInterviewModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const format = "HH:mm";

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

  const handleInterview = () => {
    setInterviewModal(true);
  };

  const RejectInterview = () => {
    axios
      .post("http://localhost:5000/rejectInterview", { id })
      .then((res) => {
        message.success("Rejected");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSubmit = (values) => {
    values.id = id;
    axios
      .post("http://localhost:5000/addInterviewData", values)
      .then((res) => {
        setLoading(false);
        handleCancel();
        form.resetFields();
        message.success("Department Added Successful");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCancel = () => {
    setInterviewModal(false);
  };

  const popcancel = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Modal
        open={interviewModal}
        onCancel={handleCancel}
        footer={[]}
        width={450}
      >
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Interview Date and Time</span>
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
                        label="Date"
                        name="interview_date"
                        rules={[
                          {
                            required: true,
                            message: "Please input Date",
                          },
                        ]}
                        hasFeedback
                      >
                        <DatePicker
                          className="myAntIpt2"
                          placeholder="Enter your Date"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Time"
                        name="interview_time"
                        rules={[
                          {
                            required: true,
                            message: "Please input Time",
                          },
                        ]}
                        hasFeedback
                      >
                        <TimePicker
                          className="myAntIpt2"
                          placeholder="Enter your Time"
                          size="small"
                          format={format}
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
      <Card
        style={{ borderRadius: "10px", padding: "0", width: "330px" }}
        className="DepCard"
      >
        <div style={{ padding: "20px" }}>
          <Row>
            <Col span={24}>
              <span className="potionCardTitle">{name}</span>
            </Col>

            <Col span={24}>
              <span className="postionCardSubtitle">{email}</span>
            </Col>
          </Row>
        </div>

        <div style={{ padding: "0px 20px 20px" }}>
          <div>
            <Row gutter={[0, 15]}>
              <Col span={12}>Last Salary</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {l_salary}
              </Col>
              <Col span={12}>Experience</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {experience} years
              </Col>
              <Col span={12}>Expected Salary</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {expected_salary}
              </Col>
              <Col span={12}>Candidate Location</Col>
              <Col span={12} style={{ textAlign: "end" }}>
                {location}
              </Col>
              {interview === "true" ? (
                <>
                  <Col span={12}>Interview</Col>
                  <Col span={12} style={{ textAlign: "end" }}>
                    21/09/2022 2:00AM
                  </Col>
                </>
              ) : (
                <>
                  <Col span={12}>Interview</Col>
                  <Col span={12} style={{ textAlign: "end" }}>
                    21/09/2022 2:00AM
                  </Col>
                </>
              )}
              <Col span={24}>
                CV
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <FileTextOutlined /> {f_name}'s cv
                  </div>
                  <div>
                    <a href={cv_link} target="_blank">
                      <DownloadOutlined />
                    </a>
                  </div>
                </div>
              </Col>

              {interview === "true" ? (
                <Col span={24}>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      className="interviewBtn"
                      type="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleInterview()}
                    >
                      Hired
                    </Button>
                    <Popconfirm
                      title="Reject Him"
                      description="Are you sure to Reject him?"
                      onConfirm={RejectInterview}
                      onCancel={popcancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="interviewBtn"> No</Button>
                    </Popconfirm>
                  </div>
                </Col>
              ) : interview === "false" ? (
                <Col span={24}>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      className="interviewBtn"
                      type="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleInterview()}
                    >
                      Interview
                    </Button>
                    <Popconfirm
                      title="Reject Him"
                      description="Are you sure to Reject him?"
                      onConfirm={RejectInterview}
                      onCancel={popcancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="interviewBtn">No</Button>
                    </Popconfirm>
                  </div>
                </Col>
              ) : (
                <Col span={24}>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Alert message="Rejected" type="error" />
                  </div>
                </Col>
              )}

              {/* {interview === undefined ? (
                <Col span={24}>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      className="interviewBtn"
                      type="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleInterview()}
                    >
                      Interview
                    </Button>
                    <Popconfirm
                      title="Reject Him"
                      description="Are you sure to Reject him?"
                      onConfirm={RejectInterview}
                      onCancel={popcancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="interviewBtn">No</Button>
                    </Popconfirm>
                  </div>
                </Col>
              ) : (
                <Col span={24}>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {interview === true ? (
                      <Button
                        className="interviewBtn"
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleInterview()}
                      >
                        Hired
                      </Button>
                    ) : (
                      <Popconfirm
                        title="Reject Him"
                        description="Are you sure to Reject him?"
                        onConfirm={RejectInterview}
                        onCancel={popcancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button className="interviewBtn">No</Button>
                      </Popconfirm>
                    )}
                  </div>
                </Col>
              )} */}
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
      .post("http://localhost:5000/getPostionsCandidate", {
        id: r_prams.id,
        name: r_prams.name,
      })
      .then((res) => {
        setAllDep(res.data);
        // console.log(res.data);
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
    setLoading(true);
    values.ref_id = r_prams.id;
    values.profile_id = r_prams.name;

    let data = new FormData();
    data.append("profile_id", values.profile_id);
    data.append("ref_id", values.ref_id);
    data.append("f_name", values.f_name);
    data.append("l_name", values.l_name);
    data.append("image", values.cv[0].originFileObj);
    data.append("candidate_location", values.candidate_location);
    data.append("email", values.email);
    data.append("experience", values.experience);
    data.append("expected_salary", values.expected_salary);
    data.append("l_salary", values.l_salary);

    axios
      .post("http://localhost:5000/addPostionsCandidate", data)
      .then((res) => {
        setLoading(false);
        handleCancel();
        form.resetFields();
        openNotificationWithIcon("success");
        getDepartment();
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

                    <Col span={12}>
                      <Form.Item
                        label="CV"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        name="cv"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Department Image",
                          },
                        ]}
                      >
                        <Upload maxCount={1}>
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
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
            _id,
            f_name,
            l_name,
            email,
            experience,
            l_salary,
            expected_salary,
            candidate_location,
            cv,
            interview,
          } = x;

          return (
            <Col xs={24} sm={24} md={8} lg={8}>
              <PostionCard
                id={_id}
                name={`${f_name} ${l_name}`}
                f_name={f_name}
                email={email}
                experience={experience}
                l_salary={l_salary}
                expected_salary={expected_salary}
                location={candidate_location}
                cv_link={cv}
                interview={interview}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ShowCandidate;
