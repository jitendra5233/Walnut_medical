import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageRole = () => {
  const [ApiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [colorList, setColorList] = useState([
    "processing",
    "success",
    "warning",
    "magenta",
    "red",
    "gold",
  ]);

  const { Option } = Select;

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_URL + "/getRole")
      .then((result) => {
        let data = result.data;
        let newArr = [];

        data.map((x, i) => {
          newArr.push({
            no: i + 1,
            name: x.name,
            date_time: new Date(x.createdAt).toLocaleString(),
            access: x.access,
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

  const downloadFile = (id) => {
    ApiData.map((x) => {
      if (id == x.id) {
        window.location.href = `${process.env.REACT_APP_API_URL}/downloadData/${x.fileLink}`;
      }
    });
  };

  const copyDownloadFileLink = (id) => {
    ApiData.map((x) => {
      if (id == x.id) {
        let copyText = `${process.env.REACT_APP_API_URL}/downloadData/${x.fileLink}`;
        navigator.clipboard.writeText(copyText);
        messageApi.open({
          type: "success",
          content: "link has been copied to the clipboard",
        });
      }
    });
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Access",
      dataIndex: "access",
      key: "access",
      render: (access) => {
        console.log(access);
        return (
          <div style={{ cursor: "pointer" }}>
            {access.map((x) => {
              return (
                <Tag
                  bordered={false}
                  color={colorList[randomIntFromInterval(0, 5)]}
                >
                  {x}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Date & Time",
      dataIndex: "date_time",
      key: "date_time",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (id) => {
        return (
          <div style={{ cursor: "pointer" }}>
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
      .post(process.env.REACT_APP_API_URL + "/deleteRole", { id })
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
    axios
      .post(process.env.REACT_APP_API_URL + "/CreateRole", values)
      .then((result) => {
        console.log(result.data);
        getData();
        messageApi.open({
          type: "success",
          content: "Role Added successfully",
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Spin spinning={loading}>
        {contextHolder}
        <div style={{ marginBottom: "2rem" }}>
          <h3>Role Managemeant</h3>
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
              <Col span={24}>
                <Form.Item
                  label="Role Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Role Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Access"
                  name="access"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Access!",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    placeholder="select one country"
                    optionLabelProp="label"
                  >
                    <Option value="admin" label="Admin">
                      Admin
                    </Option>
                    <Option value="postdata" label="POST Response">
                      POST Response
                    </Option>
                    <Option value="fileupload" label="File Upload">
                      File Upload
                    </Option>
                    <Option value="oqc" label="OQC">
                      OQC
                    </Option>
                    <Option value="lqc" label="LQC">
                      LQC
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button
                    className="myAntLoginBtn"
                    type="primary"
                    htmlType="submit"
                  >
                    Add New Role
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

export default ManageRole;
