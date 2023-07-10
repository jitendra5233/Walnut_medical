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
  Result,
  Modal,
} from "antd";
import axios from "axios";
import ShowExpense from "./ShowExpense";

const { Title } = Typography;
const { Option } = Select;

const AddExpense = (props) => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form] = Form.useForm();
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const [handleStateChange, sethandleStateChange] = useState("ok");

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/create_expense", values)
      .then((res) => {
        setLoading(false);
        setIsSubmitted(true);
        form.resetFields();
        setResultModalVisible(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
              <Title level={5} className="Expensecolor">
                Create New Expense
              </Title>
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
                    label="Item Name"
                    name="item_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the item name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Buying Date"
                    name="buying_date"
                    rules={[
                      {
                        required: true,
                        message: "Please select the buying date!",
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
                    rules={[
                      {
                        required: true,
                        message: "Please input the quantity!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Paid Amount"
                    name="paid_amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input the paid amount!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Remaining Paid Amount"
                    name="r_paidamt"
                    rules={[
                      {
                        required: true,
                        message: "Please input the remaining paid amount!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Remaining Get Amount"
                    name="r_getamt"
                    rules={[
                      {
                        required: true,
                        message: "Please input the remaining get amount!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
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
          <Result status="success" title="Successfully Expense Added!" />
        )}
      </Modal>

      {/* <ShowExpense message="Hello from parent" /> */}
      <ShowExpense message="Hello from parent" />
    </div>
  );
};

export default AddExpense;
