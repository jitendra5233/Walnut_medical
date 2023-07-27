import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  message,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeAppraisal = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const r_prams = useParams();
  const [employee, setEmployee] = useState([]);
  const [allDep, setAllDep] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  let { Option } = Select;

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "% of appraisal",
      dataIndex: "appraisal_p",
      key: "appraisal_p",
    },
    {
      title: "Revised Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Appraisal",
      dataIndex: "appraisal",
      key: "appraisal",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (id) => {
        return (
          <div>
            <span style={{ marginRight: "10px", cursor: "pointer" }}>
              <EditOutlined style={{ cursor: "pointer" }} />
            </span>
            <span>
              <DeleteOutlined style={{ cursor: "pointer" }} />
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getDetails();
    getDepartments();
    getApprisals();
  }, []);

  const getDepartments = () => {
    axios
      .get("http://localhost:5000/getDepartment")
      .then((res) => {
        setAllDep(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllJobProfiles = (ref_id) => {
    axios
      .post("http://localhost:5000/getDepartmentPostions", { id: ref_id })
      .then((res) => {
        setAllJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetails = () => {
    axios
      .post("http://localhost:5000/getCandidateDataByIdDetail", {
        id: r_prams.id,
      })
      .then((res) => {
        if (res.data.length != 0) {
          let data = res.data[0];
          data.name = `${data.f_name} ${data.l_name}`;
          getAllJobProfiles(data.department);
          form.setFieldsValue(data);

          form2.setFieldsValue({
            c_salary: data.salary,
          });

          setEmployee(data);
        }
      })
      .catch((err) => {
        console.log(console.log(err));
      });
  };

  const getApprisals = () => {
    axios
      .post("http://localhost:5000/getAppraisal", { id: r_prams.id })
      .then((res) => {
        let data = [];

        res.data.map((x, i) => {
          data.push({
            no: i + 1,
            date: x.date,
            appraisal_p: x.appraisal_p + "%",
            salary: x.salary,
            appraisal: x.appraisal,
          });
        });

        setTableData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (values) => {
    values.ref_id = r_prams.id;
    values.appraisal = "500";

    axios
      .post("http://localhost:5000/addAppraisal", values)
      .then((res) => {
        message.success("Added");
        getApprisals();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const openApprisalModel = () => {
    setShowModel(true);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  const updateSalary = () => {
    console.log("ok");
  };

  return (
    <div>
      <Modal open={showModel} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Add New Appraisal</span>
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
                    <Col span={12}>
                      <Form.Item
                        label="Appraisal Start Date"
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Appraisal Start Date",
                          },
                        ]}
                        hasFeedback
                      >
                        <DatePicker className="myAntIpt2" size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Appraisal %"
                        name="appraisal_p"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Appraisal %",
                          },
                        ]}
                      >
                        <InputNumber
                          onChange={() => updateSalary()}
                          className="myAntIpt2"
                          size="small"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Current Salary" name="c_salary">
                        <Input readOnly className="myAntIpt2" size="small" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="New Salary"
                        name="salary"
                        rules={[
                          {
                            required: true,
                            message: "Please input your New Salary",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input className="myAntIpt2" size="small" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button
                          style={{ margin: 0 }}
                          type="primary"
                          htmlType="submit"
                        >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <span className="pageTitle">Appraisal</span>
          </div>
        </div>
        <div>
          <Form form={form} name="basic" layout="vertical" autoComplete="off">
            <Row gutter={[24, 0]}>
              <Col span={6}>
                <Form.Item label="Name" name="name">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Employee Code" name="emp_code">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Department" name="department">
                  <Select
                    disabled
                    placeholder="Select Department"
                    onChange={(value) => {
                      form.resetFields(["designation"]);
                      getAllJobProfiles(value);
                    }}
                  >
                    {allDep.map((x) => (
                      <Option value={x.slug}>{x.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Designation" name="job_title">
                  <Select disabled placeholder="Select designation">
                    {allJobs.map((x) => (
                      <Option value={x.slug}>{x.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <span className="pageTitle">Appraisal History</span>
          </div>
          <div>
            <Button type="primary" onClick={openApprisalModel}>
              Add Appraisal +
            </Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={tableData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAppraisal;
