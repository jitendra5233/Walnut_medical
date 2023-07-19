import { Button, Col, Form, Input, Row, Typography, message } from "antd";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { TextArea } = Input;

  const [form] = Form.useForm();
  let { Title } = Typography;
  const r_prams = useParams();

  useEffect(() => {
    getCandidateData(r_prams.id);
  }, []);

  const getCandidateData = (id) => {
    axios
      .post("http://localhost:5000/getCandidateDataById", { id })
      .then((res) => {
        let data = res.data;
        if (data.length != 0) {
          let formData = data[0];
          form.setFieldsValue(formData);
          axios
            .post("http://localhost:5000/getCandidateData2ById", { id })
            .then((res) => {
              // console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("no");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    values.ref_id = r_prams.id;
    console.log(values);
    axios
      .post("http://localhost:5000/addCandidateDetails", values)
      .then((res) => {
        console.log(res.data);
        message.success("Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="mainContainer">
        <Row>
          <Col span={24}>
            <div className="mainTitle">
              <Title level={4}>Employee Detail</Title>
            </div>
          </Col>
          <Col span={24}>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={24}>
                <Col span={8}>
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
                <Col span={8}>
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

                <Col span={8}>
                  <Form.Item
                    label="Emp Code"
                    name="emp_code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Emp Code!",
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Department!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Designation"
                    name="designation"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Designation!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Date of joining"
                    name="date_of_joining"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Date of joining!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Experience!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Salary"
                    name="salary"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Salary!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Office Email"
                    name="office_email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Office Email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Office Email Password"
                    name="office_email_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Office Email Password!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Personal Email"
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

                <Col span={8}>
                  <Form.Item
                    label="Aadhar Card"
                    name="aadhar_no"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last Salary!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Pan Card No"
                    name="pan_no"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Pan Card No!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Bank Name"
                    name="bank_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Account No!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Account No"
                    name="account_no"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Account No!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="IFSC code "
                    name="ifsc"
                    rules={[
                      {
                        required: true,
                        message: "Please input your IFSC Code!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Phone Number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div
                    className="ant-form-item-label"
                    style={{ marginLeft: "12px" }}
                  >
                    <label>Address</label>
                  </div>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Permanent Address"
                    name="p_address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Permanent Address!",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Temporary Address"
                    name="t_address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Permanent Address!",
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button
                      className="myAntLoginBtn"
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
    </div>
  );
};

export default EmployeeDetails;
