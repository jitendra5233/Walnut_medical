import { useState, useEffect } from "react";
import { Button, Select, Col, Form, Input, Row, Typography, DatePicker, Result, Modal,notification, } from "antd";
import axios from "axios";
import { Alert, Space } from 'antd';
import ShowIssuedEnventory from "./ShowIssuedEnventory";

const { Title } = Typography;
const { Option } = Select;

const AddIssuedEnventory = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [isItemAssigned, setIsItemAssigned] = useState(false); 
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    getUsers();
    getInventory();
  }, []);

  

  const [itemData, setItemData] = useState([]);

  console.log(itemData);

  const getInventory = () => {
    axios
      .get('http://localhost:5000/getItem')
      .then((result) => {
        let data = result.data;
        let newData = [];
        newData = data;
        setItemData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [empName, setEmpName] = useState([]);

  const handleChange = (id) => {
    axios
      .post('http://localhost:5000/getUserData', { id })
      .then((res) => {
        if (res.data !== '') {
          let data = res.data;
          var emp_name = data.f_name + ' ' + data.l_name;
          form.setFieldsValue({
            emp_code: data.emp_code,
            job_title: data.job_title,
          });
          setEmpName(emp_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [updatedItemName, setUpdatedItemName] = useState([]);
  const [updateAvailableItem, setUpdatedAvailableItem] = useState([]);


  const handleUpdateItem = (id) => {
    axios
      .post('http://localhost:5000/getItemData', { id })
      .then((res) => {
        if (res.data !== '') {
          let data = res.data;
          setUpdatedItemName(data.item_name);
          setUpdatedAvailableItem(data.availableItem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [userData, setUserData] = useState([]);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/usres")
      .then((result) => {
        let data = result.data;
        let newData = [];
        newData = data;
        setUserData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    values.emp_name = empName;
    values.itemId = values.item_name;
    values.item_name = updatedItemName;
    setLoading(true);
    if(values.quantity <=updateAvailableItem)
    {
      axios
      .post("http://localhost:5000/issued_enventory", values)
      .then((res) => {
        setLoading(false);
        setIsSubmitted(true);
        form.resetFields();
        setResultModalVisible(true);
        setIsItemAssigned(true); 
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    }
  };

const handleKeyUp = (event)=>{
if(event.target.value > updateAvailableItem)
{
  form.setFieldsValue({
    quantity:'',
  });
  alert("Available Item Only" +" "+  +updateAvailableItem+ '');
}
  }

  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setResultModalVisible(false);
  };

  return (
    <div>
      <div className="mainContainer">
        <Row>
          <Col span={24}>
            <div className="mainTitle">
              <Title level={5} className="Expensecolor">Issue New Item</Title>
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
                    label="Name of Item"
                    name="item_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input name of valid!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Item"
                      allowClear
                      onChange={handleUpdateItem}
                    >
                      {itemData.map((option) => (
                        <option value={option._id}>{`${option.item_name}`}</option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Serial Number"
                    name="serial_number"
                    rules={[
                      {
                        required: true,
                        message: "Please input  Serial number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                    <Select
                      placeholder="Select Eployee"
                      allowClear
                      onChange={handleChange}
                    >
                      {userData.map((option) => (
                        <option value={option._id}>{`${option.emp_code} - ${option.f_name} ${option.l_name}`}</option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Job Title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Assigned Date"
                    name="assignment_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input Assigned Date!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    onKeyUp={handleKeyUp}
                    rules={[
                      {
                        required: true,
                        message: "Please input Quantity!",
                      },
                    ]}
                  >
                    <Input className="quantity"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>

      <Modal
        visible={resultModalVisible}
        onCancel={handleRetry}
        footer={[
          <Button key="retry" type="primary" onClick={handleRetry}>
            Insert Another Item
          </Button>,
        ]}
      >
        {isSubmitted && (
          <Result
            status="success"
            title="Successfully Issued Item!"
          />
        )}
      </Modal>
      <ShowIssuedEnventory isItemAssigned={isItemAssigned} /> 
    </div>
  );
};

export default AddIssuedEnventory;
