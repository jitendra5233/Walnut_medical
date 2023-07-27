import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Upload,
  Select,
  notification,
  Modal,
} from "antd";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const { confirm } = Modal;

const HomeSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [socialIcons, setSocialIcons] = useState([
    { icon_name: undefined, social_url: undefined },
  ]);
  const [updateId, setUpdateId] = useState(null);
  const [accountData, setAccountData] = useState([]);
  console.log(accountData);

  useEffect(() => {
    getWebsetting();
  }, []);

  const getWebsetting = () => {
    axios
      .get("http://localhost:5000/getwebsetting")
      .then((result) => {
        const data = result.data;
        if (data.length > 0) {
          const { _id, socialIcons, ...rest } = data[0];
          setUpdateId(_id);
          form.setFieldsValue({ ...rest });
          setAccountData(socialIcons);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("id", updateId);
      data.append("company_name", values.company_name);
      data.append("contact_email", values.contact_email);
      data.append("carrer_email", values.carrer_email);
      data.append("watsapp_number", values.watsapp_number);
      data.append("Contact_number", values.Contact_number);
      data.append("smtp_host", values.smtp_host);
      data.append("smtp_port", values.smtp_port);
      data.append("smtp_username", values.smtp_username);
      data.append("smtp_password", values.smtp_password);
      data.append("socialIcons", JSON.stringify(values.socialIcons));

      if (values.image) {
        data.append("image", values.image[0].originFileObj);
      }

      await axios.post("http://localhost:5000/update_websetting", data);
      setLoading(false);
      getWebsetting();
      form.resetFields();
      notification.success({
        message: "Web Setting Updated",
        description: "Web Setting has been updated successfully.",
        placement: "topRight",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      openNotificationWithIcon("error", "Failed to update account");
    }
  };

  const handleAddMore = () => {
    setSocialIcons([
      ...socialIcons,
      { icon_name: undefined, social_url: undefined },
    ]);
  };

  const handleRemove = (index) => {
    setSocialIcons((prevIcons) => prevIcons.filter((item, i) => i !== index));
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      placement: "bottomRight",
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleDeleteIcon = (socialIconId) => {
    const websettingId = updateId;
    confirm({
      title: "Delete the Social Icon",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this Social Icon?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSocialIcon(socialIconId, websettingId);
      },
    });
  };

  const deleteSocialIcon = (socialIconId, websettingId) => {
    console.log(socialIconId);
    console.log(websettingId);
    axios
      .delete(
        `http://localhost:5000/delete_social_icon/${websettingId}/${socialIconId}`
      )
      .then((response) => {
        console.log(response.data);
        getWebsetting();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="mainTitle">
            <Title level={5} className="Expensecolor">
              Web Setting
            </Title>
          </div>
        </Col>
        <Col span={24}>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Row gutter={24}>
              <Col span={24} style={{ marginBottom: "20px" }}>
                <Form.Item
                  label="Upload Logo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="image"
                >
                  <Upload listType="picture-card" maxCount={1}>
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Company Name"
                  name="company_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input company name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Contact Us Email"
                  name="contact_email"
                  rules={[
                    {
                      required: true,
                      message: "Please input contact email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Career Email"
                  name="carrer_email"
                  rules={[
                    {
                      required: true,
                      message: "Please input career email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Contact Number"
                  name="Contact_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input contact number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="WhatsApp Number"
                  name="watsapp_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input WhatsApp number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SMTP Host"
                  name="smtp_host"
                  rules={[
                    {
                      required: true,
                      message: "Please input SMTP Host!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SMTP Port"
                  name="smtp_port"
                  rules={[
                    {
                      required: true,
                      message: "Please input SMTP Port!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SMTP Username"
                  name="smtp_username"
                  rules={[
                    {
                      required: true,
                      message: "Please input SMTP Username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SMTP Password"
                  name="smtp_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input SMTP Password!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              {socialIcons.map((item, index) => (
                <React.Fragment key={index}>
                  <Col span={11}>
                    <Form.Item
                      label={`Social Icon ${index + 1}`}
                      name={["socialIcons", index, "icon_name"]}
                      initialValue={item.icon_name}
                    >
                      <Select
                        placeholder="Select Icon"
                        allowClear
                        className="myAntIptSelect2"
                      >
                        <Option value="fab fa-facebook">Facebook</Option>
                        <Option value="fab fa-instagram">Instagram</Option>
                        <Option value="fab fa-linkedin">LinkedIn</Option>
                        <Option value="fab fa-tiktok">TikTok</Option>
                        <Option value="fab fa-twitch">Twitch</Option>
                        <Option value="fab fa-twitter">Twitter</Option>
                        <Option value="fab fa-whatsapp">WhatsApp</Option>
                        <Option value="fab fa-google">Google</Option>
                        <Option value="fab fa-google-plus">Google Plus</Option>
                        <Option value="fab fa-youtube">YouTube</Option>
                        <Option value="fab fa-youtube-play">
                          YouTube Play
                        </Option>
                        <Option value="fab fa-youtube-square">
                          YouTube Square
                        </Option>
                        <Option value="fab fa-pinterest">Pinterest</Option>
                        <Option value="fab fa-pinterest-p">Pinterest P</Option>
                        <Option value="fab fa-pinterest-square">
                          Pinterest Square
                        </Option>
                        <Option value="fab fa-github">GitHub</Option>
                        <Option value="fab fa-gitlab">GitLab</Option>
                        <Option value="fas fa-phone">Phone</Option>
                        <Option value="fas fa-phone-square">
                          Phone Square
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label={`Social URL ${index + 1}`}
                      name={["socialIcons", index, "social_url"]}
                      initialValue={item.social_url}
                      hasFeedback
                    >
                      <Input
                        className="myAntIpt2"
                        placeholder="Enter URL"
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    {index === socialIcons.length - 1 && (
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={handleAddMore}
                          block
                          className="add-more-button"
                        >
                          Add More
                        </Button>
                      </Form.Item>
                    )}
                    {index !== socialIcons.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => handleRemove(index)}
                        block
                        className="remove-button"
                      >
                        <DeleteOutlined />
                      </Button>
                    )}
                  </Col>
                </React.Fragment>
              ))}

              <Col span={12}>
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
      <List
        bordered
        dataSource={accountData}
        renderItem={(accountData) => (
          <List.Item className="list-style">
            <i className={accountData.icon_name}></i>
            {accountData.social_url}
            <i
              class="fa fa-trash"
              id="deleteicon"
              aria-hidden="true"
              onClick={() => handleDeleteIcon(accountData._id)}
            ></i>
          </List.Item>
        )}
      />
    </>
  );
};

export default HomeSettings;
