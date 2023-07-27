import { useState, useEffect } from "react";
import {
  Button,
  Select,
  Col,
  Form,
  Input,
  Row,
  Typography,
  DatePicker,
  Modal,
  notification,
  AutoComplete,
  Spin,
  Upload,
  message,
  Table,
} from "antd";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import moment from "moment";
const { Title } = Typography;
const { confirm } = Modal;
let { Option } = Select;

const AccountDetails = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [userModalOpen, setuserModalOpen] = useState(false);
  const [userUpdateModalOpen, setuserUpdateModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const showUserModal = () => {
    setuserModalOpen(true);
  };
  const handleUserCancel = () => {
    setuserModalOpen(false);
  };

  const handleUserUpdateCancel = () => {
    setuserUpdateModalOpen(false);
  };
  const showUpdateUserModal = () => {
    setuserUpdateModalOpen(true);
  };

  useEffect(() => {
    getAccountDetails();
    getSocialAccountDetails();
    getAssignedEmplyee();
  }, []);
  const { id } = useParams();
  const [ClientData, setClientData] = useState([]);
  const getAccountDetails = () => {
    axios
      .post("http://localhost:5000/getAcountData", { id })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          setClientData(data);
          form.setFieldsValue({
            kay: data._id,
            client_name: data.client_name,
            client_id: data.client_id,
            password: data.password,
            project_name: data.project_name,
            client_designation: data.client_designation,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (values) => {
    setLoading(true);
    let data = new FormData();
    data.append("client_name", values.client_name);
    data.append("client_designation", values.client_designation);
    data.append("project_name", values.project_name);
    data.append("client_id", values.client_id);
    data.append("image", values.image[0].originFileObj);
    data.append("password", values.password);
    data.append("client_status", "new");
    axios
      .post("http://localhost:5000/create_clientAccount", data)
      .then((res) => {
        handleCancel1(true);
        form1.resetFields();
        setLoading(false);
        getAccountDetails();
        openNotificationWithIcon("success", "Account Added Successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        openNotificationWithIcon("error", "Failed to add department");
      });
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      let data = new FormData();
      data.append("id", id);
      data.append("client_name", values.client_name);
      data.append("client_designation", values.client_designation);
      data.append("project_name", values.project_name);
      data.append("client_id", values.client_id);
      data.append("client_status", "new");
      if (values.image) {
        data.append("image", values.image[0].originFileObj);
      }
      data.append("password", values.password);

      const response = await axios.post(
        "http://localhost:5000/update_clientAccount",
        data
      );
      getAccountDetails();
      handleCancel(true);
      form.resetFields();
      setLoading(false);
      openNotificationWithIcon("success", "Account updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      openNotificationWithIcon("error", "Failed to update account");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [userSuggestions, setUserSuggestions] = useState([]);
  const [empName, setEmpName] = useState([]);

  const handleChange = (value, option) => {
    let userId = option.key;
    axios
      .post("http://localhost:5000/getUserData", { userId })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          var emp_name = data.f_name + " " + data.l_name;
          form2.setFieldsValue({
            emp_code: data.emp_code,
            designation: data.designation,
          });
          setEmpName(emp_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAssignEmpSerch = (value, option) => {
    let userId = option.key;
    axios
      .post("http://localhost:5000/getUserData", { userId })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          var emp_name = data.f_name + " " + data.l_name;
          form3.setFieldsValue({
            emp_code: data.emp_code,
            designation: data.designation,
          });
          setEmpName(emp_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [getImage, setImage] = useState([]);
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
  const openNotificationWithIcon = (type, message) => {
    if (type === "error") {
      api[type]({
        message: "Server Error",
        description: "",
      });
    } else {
      api[type]({
        message,
        description: "",
      });
    }
  };

  const [assignedEmployeeData, setassignedEmployeeData] = useState([]);
  const [getocialClientId, setSocialClientId] = useState([]);
  const getSocialAccountDetails = () => {
    axios
      .get("http://localhost:5000/getsocialAccountDeatils")
      .then((result) => {
        let data = result.data;
        let newData = [];
        data.map((x) => {
          if (x.client_id == getocialClientId) {
            newData.push({
              key: x._id,
              icon_name: x.icon_name,
              social_url: x.social_url,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssignedEmplyee = () => {
    axios
      .get("http://localhost:5000/getAssignedEmp")
      .then((result) => {
        let data = result.data;
        let newData = [];
        data.map((x) => {
          if (x.client_id == id) {
            newData.push({
              key: x._id,
              emp_name: x.emp_name,
              assignment_date: new Date(x.assignment_date).toLocaleDateString(),
              emp_code: x.emp_code,
              designation: x.job_title,
              emp_status: "permanent",
            });
          }
        });
        setassignedEmployeeData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [asignedEmpId, setAssignedEmpId] = useState([]);
  const [oldasigneddate, setoldasigneddate] = useState([]);
  const handleEdit = (id) => {
    setAssignedEmpId(id);

    showUpdateUserModal();
    assignedEmployeeData.map((data) => {
      if (data.key === id) {
        setoldasigneddate(data.assignment_date);
        // const assignmentDate = moment(data.assignment_date, "MM/DD/YYYY");
        form3.setFieldsValue({
          kay: data._id,
          emp_name: data.emp_name,
          emp_code: data.emp_code,
          designation: data.designation,
        });
      }
    });
  };
  const handleDelete = (id) => {
    confirm({
      title: "Delete the Issued Item",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this Issue Item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteIcon(id);
      },
    });
  };
  const deleteIcon = (id) => {
    axios
      .delete(`http://localhost:5000/delete_assignemployee/${id}`)
      .then((response) => {
        getAccountDetails();
        getAssignedEmplyee();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlenameSearch = (value) => {
    // Fetch item suggestions based on the user's input
    axios
      .get(`http://localhost:5000/items/searchName?query=${value}`)
      .then((response) => {
        const items = response.data;
        setUserSuggestions(items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAssignEmp = (values) => {
    values.client_id = id;
    values.emp_name = empName;
    values.job_title = values.designation;
    values.client_name = ClientData.client_name;
    values.client_userId = ClientData.client_id;
    values.client_password = ClientData.password;
    values.client_projectname = ClientData.project_name;
    setLoading(true);
    axios
      .post("http://localhost:5000/assign_employee", values)
      .then((res) => {
        getAssignedEmplyee();
        setLoading(false);
        handleUserCancel(true);
        form2.resetFields();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleUpdateAssignEmp = (values) => {
    values.id = asignedEmpId;
    values.job_title = values.designation;
    if (values.assignment_date == undefined) {
      values.assignment_date = oldasigneddate;
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/update_assignmployee", values)
      .then((res) => {
        if (res !== "") {
          setLoading(false);
          getAccountDetails();
          getSocialAccountDetails();
          getAssignedEmplyee();
          handleUserUpdateCancel();
          form3.resetFields();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "emp_name",
      key: "emp_name",
    },

    {
      title: "Employee Code",
      dataIndex: "emp_code",
      key: "emp_code",
    },

    {
      title: "Job Title",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Assigned Date",
      dataIndex: "assignment_date",
      key: "assignment_date",
    },

    {
      title: "Status",
      dataIndex: "emp_status",
      key: "emp_status",
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
      <div className="mainContainer">
        <Row>
          <Col span={24}>
            <div className="mainTitle">
              <Title level={5} className="Expensecolor">
                Accounts Details
              </Title>
              <button className="Expensecolorbtn" onClick={showModal1}>
                Add Another Account +
              </button>
              <button className="filtercolorbtn" onClick={showModal}>
                Edit Details
              </button>
            </div>
          </Col>
          <Col span={24}>
            <Form form={form} name="basic" layout="vertical" autoComplete="off">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="Client Name" name="client_name">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Client Designation"
                    name="client_designation"
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Project Name" name="project_name">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Client Id" name="client_id">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Password" name="password">
                    <Input disabled />
                  </Form.Item>
                </Col>

                {/* <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Form.Item>
                </Col> */}
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      <Modal open={isModalOpen1} onCancel={handleCancel1} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Add New Account</span>
              </Col>
              <Col span={24}>
                <Form
                  form={form1}
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
                      <Form.Item
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        name="image"
                        rules={[
                          {
                            required: true,
                            message: "Please input Client Image",
                          },
                        ]}
                      >
                        <Upload
                          listType="picture-card"
                          src={getImage}
                          maxCount={1}
                        >
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
                        label="Client name"
                        name="client_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input client name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Client Designation"
                        name="client_designation"
                        rules={[
                          {
                            required: true,
                            message: "Please input client designation",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client designation"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Project Name"
                        name="project_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input project name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter project name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Client Id"
                        name="client_id"
                        rules={[
                          {
                            required: true,
                            message: "Please input client Id",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client Id"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input client Password",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client Password"
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

      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Update Account</span>
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
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row gutter={24}>
                    <Col span={24} style={{ marginBottom: "20px" }}>
                      <Form.Item
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        name="image"
                      >
                        <Upload
                          listType="picture-card"
                          src={getImage}
                          maxCount={1}
                        >
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
                        label="Client name"
                        name="client_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input client name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Client Designation"
                        name="client_designation"
                        rules={[
                          {
                            required: true,
                            message: "Please input client designation",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client designation"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Project Name"
                        name="project_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input project name",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter project name"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Client Id"
                        name="client_id"
                        rules={[
                          {
                            required: true,
                            message: "Please input client Id",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client Id"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input client Password",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="myAntIpt2"
                          placeholder="Enter client Password"
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

      <div className="m12r">
        <Title level={3} className="Expensecolor">
          Assigned Accounts
        </Title>
        <button className="Expensecolorbtn" onClick={showUserModal}>
          Assign Employee +
        </button>
        {/* <button className="filtercolorbtn">Filter</button> */}
      </div>

      <Modal open={userModalOpen} onCancel={handleUserCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Assign Employee</span>
              </Col>
              <Col span={24}>
                <Form
                  form={form2}
                  name="basic"
                  layout="vertical"
                  onFinish={handleAssignEmp}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="Employee Name"
                        name="emp_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input employee name!",
                          },
                        ]}
                        hasFeedback
                      >
                        <AutoComplete
                          placeholder="Select Item"
                          onSearch={handlenameSearch}
                          onChange={handleChange}
                        >
                          {userSuggestions.map((option) => (
                            <Option
                              key={option._id}
                              value={`${option.emp_code} - ${option.f_name} ${option.l_name}`}
                            >
                              {`${option.f_name} ${option.l_name}`}
                            </Option>
                          ))}
                        </AutoComplete>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Employee Code"
                        name="emp_code"
                        rules={[
                          {
                            required: true,
                            message: "Please input code of Employee!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Employee code.." disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Job Title"
                        name="designation"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Job Title!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Job title..." disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Assigned Date"
                        name="assignment_date"
                        rules={[
                          {
                            required: true,
                            message: "Please input Assigned Date!",
                          },
                        ]}
                        hasFeedback
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          disabledDate={(current) =>
                            current && current < moment().startOf("day")
                          }
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

      <Modal
        open={userUpdateModalOpen}
        onCancel={handleUserUpdateCancel}
        footer={[]}
      >
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Update Assigned Employee</span>
              </Col>
              <Col span={24}>
                <Form
                  form={form3}
                  name="basic"
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleUpdateAssignEmp}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="Employee Name"
                        name="emp_name"
                        rules={[
                          {
                            required: true,
                            message: "Please input employee name!",
                          },
                        ]}
                      >
                        <AutoComplete
                          placeholder="Select Item"
                          onSearch={handlenameSearch}
                          onChange={handleAssignEmpSerch}
                        >
                          {userSuggestions.map((option) => (
                            <Option
                              key={option._id}
                              value={`${option.f_name} ${option.l_name}`}
                            >
                              {`${option.f_name} ${option.l_name}`}
                            </Option>
                          ))}
                        </AutoComplete>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Employee Code"
                        name="emp_code"
                        rules={[
                          {
                            required: true,
                            message: "Please input code of Employee!",
                          },
                        ]}
                      >
                        <Input placeholder="Employee code.." disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Job Title"
                        name="designation"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Job Title!",
                          },
                        ]}
                      >
                        <Input placeholder="Job title..." disabled />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item label="Old Assigned Date">
                        <Input
                          value={oldasigneddate}
                          disabled
                          className="sameinput"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label="Update Assigned Date / (Optional)"
                        name="assignment_date"
                      >
                        <DatePicker style={{ width: "100%" }} />
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
      <div>
        <Table columns={columns} dataSource={assignedEmployeeData} />
      </div>
    </div>
  );
};

export default AccountDetails;
