import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Table,
  Modal,
  Typography,
  Row,
  Col,
  Avatar,
  notification,
  Form,
  Input,
  Space,
  DatePicker,
  AutoComplete,
  Select,
  Spin,
} from "antd";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
const { TextArea } = Input;
const { Title } = Typography;
const { confirm } = Modal;
const { Option } = Select;
const moment = require("moment");

const EmployeeExit = () => {
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  useEffect(() => {
    getEmployeeExit();
  }, []);
  const getEmployeeExit = () => {
    axios
      .get("http://localhost:5000/GetEmployeeExit")
      .then((result) => {
        let data = result.data;
        console.log(data);
        let newData = [];
        data.map((x) => {
          newData.push({
            key: x._id,
            emp_name: x.emp_name,
            emp_code: x.emp_code,
            joining_date: new Date(x.joining_date).toLocaleDateString(),
            designation: x.designation,
            experience: x.experience,
            salary: x.salary,
            personal_email: x.personal_email,
            office_email: x.office_email,
          });
        });

        setTableData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [updatecompanyaccountId, setUpdatecompanyaccountId] = useState([]);
  // const [oldrenewaldate, setoldasigneddate] = useState([]);
  // const [oldnotificationdate, setoldnotificationdate] = useState([]);

  // const handleEdit = (id) => {
  //   showModal();
  //   setUpdatecompanyaccountId(id);
  //   tableData.map((x) => {
  //     if (x.key == id) {
  //       setoldasigneddate(x.renewal_date);
  //       setoldnotificationdate(x.notification_date);
  //       form1.setFieldsValue({
  //         key: x._id,
  //         hosting_name: x.hosting_name,
  //         hosting_url: x.hosting_url,
  //         services: x.services,
  //         client_name: x.client_name,
  //         username: x.username,
  //         password: x.password,
  //       });
  //     }
  //   });
  // };

  // const handleUpdate = (values) => {
  //   values.id = updatecompanyaccountId;
  //   if (values.renewal_date === undefined) {
  //     values.renewal_date = oldrenewaldate;
  //   }
  //   if (values.notification_date !== undefined && values.renewal_date) {
  //     values.notification_date = moment(values.renewal_date)
  //       .subtract(10, "days")
  //       .format("YYYY-MM-DD");
  //   }
  //   axios
  //     .post("http://localhost:5000/update-companyaccount", values)
  //     .then((res) => {
  //       if (res != "") {
  //         getCompanyAccount();
  //         setIsModalOpen(false);
  //         handleCancel(true);
  //         form1.resetFields();
  //         notification.success({
  //           message: "Company Account Updated",
  //           description: "Company Account has been updated successfully.",
  //           placement: "topRight",
  //           icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const handleDelete = (id) => {
    console.log(id);
    // confirm({
    //   title: "Delete the Issued Item",
    //   icon: <ExclamationCircleOutlined />,
    //   content: "Are you sure to delete this Issue Item?",
    //   okText: "Yes",
    //   okType: "danger",
    //   cancelText: "No",
    //   onOk() {
    //     deleteItem(id);
    //   },
    // });
  };

  // const deleteItem = (id) => {
  //   axios
  //     .delete("http://localhost:5000/delete_companyaccount", {
  //       data: { id }, // Pass the data as an object
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setTableData((prevData) => prevData.filter((item) => item.key !== id));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "emp_name",
      key: "emp_name",
      render: (text) => <a>{text}</a>,
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
      title: "Date of Joining",
      dataIndex: "joining_date",
      key: "joining_date",
    },

    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Personal Email",
      dataIndex: "personal_email",
      key: "personal_email",
    },
    {
      title: "Office Email",
      dataIndex: "office_email",
      key: "office_email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Link to={`/view-employeeexit/${record.key}`}>
            <a>
              {" "}
              <span>
                <EyeOutlined style={{ cursor: "pointer" }} />
              </span>
            </a>
          </Link>
          <Link to={`/edit-employeeexit/${record.key}`}>
            <a>
              {" "}
              <span>
                <EditOutlined style={{ cursor: "pointer" }} />
              </span>
            </a>
          </Link>
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
          Employee Dtails
        </Title>
        <Link to={`/add-employeeexit`}>
          <button className="Expensecolorbtn">Create New Exit +</button>
        </Link>

        <button className="filtercolorbtn">
          Filter <i class="fa fa-filter" aria-hidden="true"></i>
        </button>
      </div>

      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default EmployeeExit;
