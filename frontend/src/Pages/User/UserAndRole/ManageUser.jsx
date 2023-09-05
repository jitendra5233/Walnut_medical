import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageUser = () => {
  const [ApiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ActiveId, setActiveId] = useState(0);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  let { Option } = Select;

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_URL + "/GetUserList")
      .then((result) => {
        let data = result.data;
        let newArr = [];

        data.map((x, i) => {
          newArr.push({
            no: i + 1,
            name: `${x.f_name} ${x.l_name}`,
            image: x.image,
            f_name: x.f_name,
            l_name: x.l_name,
            email: x.email,
            role: x.role,
            action: x._id,
            id: x._id,
            fileLink: x.link,
          });
        });

        setApiData(newArr);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditUser = (id) => {
    ApiData.map((x) => {
      if (x.id == id) {
        setActiveId(id);
        form2.setFieldsValue(x);
        showModal();
      }
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Profile",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <div>
            <Avatar
              size={35}
              src={
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/${image}`}
                  alt="avatar"
                />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (id) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <EditOutlined
              onClick={() => EditUser(id)}
              title="Copy Link"
              style={{
                fontSize: "14px",
                color: "green",
                marginRight: "10px",
              }}
            />
            <DeleteOutlined
              onClick={() => handleDelete(id)}
              style={{ fontSize: "14px", color: "red" }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL + "/deleteUser", { id })
      .then((result) => {
        console.log(result.data);
        messageApi.open({
          type: "error",
          content: "File has been deleted",
        });
        getData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    console.log(values);

    setLoading(true);

    console.log("Success:", values.file.file.originFileObj);

    let data = new FormData();

    data.append("f_name", values.f_name);
    data.append("l_name", values.l_name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("role", values.role);
    data.append("myfile", values.file.file.originFileObj);

    axios
      .post(process.env.REACT_APP_API_URL + "/CreateUser", data)
      .then((result) => {
        console.log(result.data);
        getData();
        messageApi.open({
          type: "success",
          content: "file uploaded successfully",
        });
        setLoading(false);
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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

  const handleSubmit = (values) => {
    setLoading(true);

    let data = new FormData();

    data.append("id", ActiveId);
    data.append("f_name", values.f_name);
    data.append("l_name", values.l_name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("role", values.role);
    data.append(
      "myfile",
      values.file === undefined ? false : values.file.file.originFileObj
    );

    axios
      .post(process.env.REACT_APP_API_URL + "/UpdateUser", data)
      .then((result) => {
        console.log(result.data);
        getData();
        messageApi.open({
          type: "success",
          content: "file uploaded successfully",
        });
        setLoading(false);
        form2.resetFields();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Add New Department</span>
              </Col>
              <Col span={24}>
                <Form
                  form={form2}
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
                      <Form.Item label="Profile Photo" name="file">
                        <Upload action="/upload.do" listType="picture-card">
                          <div>
                            <PlusOutlined />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="f_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="l_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Last Name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Role!",
                          },
                        ]}
                      >
                        <Select placeholder="Select Role" allowClear>
                          <Option value="admin">Admin</Option>
                          <Option value="api_tester">API Tester</Option>
                          <Option value="form_tester">Form Tester</Option>
                        </Select>
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
      <Spin spinning={loading}>
        {contextHolder}
        <div style={{ marginBottom: "2rem" }}>
          <h3>User Managemeant</h3>
        </div>
        <div>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={24} style={{ width: "100%" }}>
              <Col span={5}>
                <Form.Item
                  label="First Name"
                  name="f_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label="Last Name"
                  name="l_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Last Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Role!",
                    },
                  ]}
                >
                  <Select placeholder="Select Role" allowClear>
                    <Option value="admin">Admin</Option>
                    <Option value="api_tester">API Tester</Option>
                    <Option value="form_tester">Form Tester</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Profile Photo"
                  name="file"
                  rules={[
                    {
                      required: true,
                      message: "Please input you Profile Photo!",
                    },
                  ]}
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button
                    className="myAntLoginBtn"
                    type="primary"
                    htmlType="submit"
                  >
                    Add New User
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table columns={columns} dataSource={ApiData} />
        </div>
      </Spin>
    </div>
  );
};

export default ManageUser;
