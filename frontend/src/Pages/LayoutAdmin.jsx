import { useState, useEffect } from "react";
import {
  PieChartOutlined,
  UserOutlined,
  GlobalOutlined,
  HomeFilled,
  SearchOutlined,
  DropboxOutlined,
  ContactsOutlined,
  QuestionOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShareAltOutlined,
  ApiOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  Card,
  Button,
  Layout,
  Menu,
  theme,
  Avatar,
  Popover,
  Row,
  Col,
  Form,
  Input,
  Spin,
  Upload,
  Modal,
  notification,
  AutoComplete,
  Select,
  Space,
  Dropdown,
} from "antd";
import axios from "axios";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAc } from "../Redux/Actions";
const { Header, Content, Footer, Sider } = Layout;
let { Option } = Select;

const LayoutEmp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.persistedReducer);
  const [collapsed, setCollapsed] = useState(false);
  const [f_name, setFName] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [l_name, setLName] = useState("");
  const [user_id, setUserId] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [userSuggestionsimg, setUserSuggestionsimg] = useState([]);

  const [empName, setEmpName] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const [empImgDetails, setEmpImgDetails] = useState([]);

  const { SubMenu } = Menu;

  useEffect(() => {
    checkLogin();
    setProfile();
  }, []);

  const setProfile = () => {
    let user = selector.user;
    setFName(user.f_name);
    setLName(user.l_name);
    setUserId(user.employee_id);
  };

  const checkLogin = () => {
    if (!selector.isLogin) {
      navigate("/login");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openNotificationWithIcon = (type, message) => {
    if (type === "error") {
      notification.error({
        message: "Server error!",
        description: "",
      });
    } else if (type === "warning") {
      notification.warning({
        message,
        description: "",
      });
    } else {
      notification[type]({
        message,
        description: "",
      });
    }
  };
  const content = (
    <div style={{ textAlign: "center" }}>
      <div>
        <Avatar
          size={35}
          src={<img src="./icon/userImg.png" alt="avatar" />}
          style={{ margin: " 0 15px" }}
        />
      </div>
      <div>
        <h4>Admin</h4>
      </div>
      <div>
        <h5>Admin</h5>
      </div>
      <div style={{ margin: "10px 0 0 0" }}>
        <Link to={`/profile/${user_id}`} className="menuText">
          <Button type="primary" block primary>
            Profile
          </Button>
        </Link>
        <Button type="primary" block danger onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );

  const handleLogout = () => {
    dispatch(handleLogoutAc());
    navigate("/login");
  };

  const handleUpdate = async (values) => {
    values.id = user_id;
    if (values.new_password !== values.confirm_password) {
      openNotificationWithIcon(
        "warning",
        "Confirm Password and New Password must be the same!"
      );
    } else {
      setLoading(true);
      try {
        const { id, old_password, new_password } = values;
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/update_password",
          {
            id,
            oldpassword: old_password,
            newpassword: new_password,
          }
        );
        if (response.data.message == "Password updated successfully") {
          form.resetFields();
          setLoading(false);
          handleCancel(true);
          openNotificationWithIcon("success", response.data.message);
        }
        if (response.data.message == "Old Password does Not Matched!") {
          setLoading(false);
          openNotificationWithIcon("warning", response.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        openNotificationWithIcon("error", "Failed to update Password");
      }
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />, "", "/"),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Users", "3", "", "", "/users"),
      getItem("Add User", "4", "", ""),
    ]),
  ];
  const handlenameSearch = (value) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/searchEmployeeName?query=${value}`
      )
      .then((response) => {
        const data = response.data;
        setUserSuggestions(data);
        // setUserSuggestionsimg(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleChange = (value, option) => {
    let userId = option.key;
    axios
      .post(process.env.REACT_APP_API_URL + "/getEmployeeData", { userId })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          var emp_name = data.f_name + " " + data.l_name;
          setEmpDetails(data.doc);
          setEmpImgDetails(data.getEmployeeImg);
          showModal(true);
          setEmpName(emp_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
          }}
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
          width={250}
        >
          {/* <img
            src="./logo.png"
            alt=""
            style={{ width: "100%", padding: "44px 24px" }}
          /> */}
          <div
            style={{ width: "100%", padding: "44px 24px", textAlign: "center" }}
          >
            <span style={{ fontSize: "25px", fontWeight: 400 }}>
              Walnut Medical
            </span>
          </div>
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <div style={{ display: "flex" }}>
                <div>
                  <HomeFilled
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </div>
                <div>
                  <Link to="/" className="menuText">
                    Dashboard
                  </Link>
                </div>
              </div>
            </Menu.Item>

            <div className="menuHeading">
              <span className="menuHeadingTxt">Main menu</span>
            </div>

            <Menu.Item key="2">
              <div style={{ display: "flex" }}>
                <div>
                  <ApiOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </div>
                <div>
                  <Link to="/PostApi" className="menuText">
                    Show POST Data
                  </Link>
                </div>
              </div>
            </Menu.Item>

            <Menu.Item key="3">
              <div style={{ display: "flex" }}>
                <div>
                  <CloudUploadOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </div>
                <div>
                  <Link to="/uploadFiles" className="menuText">
                    Upload Files
                  </Link>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item key="4">
              <div style={{ display: "flex" }}>
                <div>
                  <SettingOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </div>
                <div>
                  <Link to="/web_setting" className="menuText">
                    Settings
                  </Link>
                </div>
              </div>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              boxShadow: "1px 1px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            <Row style={{ margin: "0 30px" }}>
              <Col span={8} className="h64p">
                <span className="appBarTxt">Dashboard</span>
              </Col>
              <Col span={8}>
                {/* <Form.Item name="emp_name" className="h64p fontchange">
                  <AutoComplete
                    placeholder="Search Employee"
                    onSearch={handlenameSearch}
                    onChange={handleChange}
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                  >
                    {userSuggestions.map((option) => (
                      <AutoComplete.Option
                        key={option.ref_id}
                        value={`${option.f_name} ${option.l_name}`}
                      >
                        <div className="search-result-item">
                          {option.photo == undefined ? (
                            <img
                              className="set_img1"
                              alt="example"
                              src="./user1.png"
                            />
                          ) : (
                            <img
                              className="set_img1"
                              alt="example"
                              src={option.photo}
                            />
                          )}

                          <div className="colorchangeblue">
                            <span>
                              {option.emp_code} - {option.f_name}{" "}
                              {option.l_name}
                            </span>
                            <div className="department">
                              {option.department}
                            </div>
                          </div>
                          <span className="colorchange">{option.phone}</span>
                        </div>
                      </AutoComplete.Option>
                    ))}
                  </AutoComplete>
                </Form.Item> */}
              </Col>
              {/* <Col span={8} className="h64p">
                <Input
                  size="large"
                  onSearch={handlenameSearch}
                  className="appBarSearchIpt"
                  placeholder="Enter your username"
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                />
              </Col> */}
              <Col span={8} className="h64p">
                <Row>
                  <Col span={10} className="h64p">
                    {/* <img
                      style={{ width: "22px", margin: "22px  0" }}
                      src="./icon/bellicon.svg"
                    /> */}
                  </Col>
                  <Col span={4} className="h64p">
                    <Avatar
                      size={35}
                      src={<img src="./icon/userImg.png" alt="avatar" />}
                      style={{ margin: " 0 15px" }}
                    />
                  </Col>
                  <Col span={10} className="h64p" style={{ cursor: "pointer" }}>
                    <Popover
                      placement="bottom"
                      content={content}
                      trigger="click"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <div className="appBarUserContainer">
                          <span className="appBarUserName">{f_name}</span>

                          <span className="appBarUserType">Admin</span>
                        </div>
                        <img
                          style={{ margin: "0 20px" }}
                          src="./icon/ArrowDown.png"
                        />
                      </div>
                    </Popover>
                  </Col>
                  {/* <Col span={1} className="h64p"></Col> */}
                </Row>
              </Col>
            </Row>
          </Header>

          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "auto",
              height: "80vh",
              background: "#F6F8FB",
            }}
          >
            <div
              style={{
                padding: 24,
                height: "100%",
                background: "#F6F8FB",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24}>
                <Form
                  form={form}
                  name="basic"
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item name="client_name">
                        {empImgDetails.photo == undefined ? (
                          <img
                            className="set_img2"
                            alt="example"
                            src="./user1.png"
                          />
                        ) : (
                          <img
                            className="set_img2"
                            alt="example"
                            src={empImgDetails.photo}
                          />
                        )}
                        <span className="set_img2 setcolor">
                          {empDetails.f_name + " " + empDetails.l_name}
                        </span>
                        <br></br>
                        <span className="set_img2">{empDetails.job_title}</span>
                        <br></br>
                        <span className="set_img2">{empDetails.email}</span>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <hr className="addmargin"></hr>
                    </Col>
                    <Col span={24} style={{ marginBottom: "0px" }}>
                      <span className="popupTitle">Profile</span>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="client_name"></Form.Item>
                      <div class="container">
                        <div class="row">
                          <span class="label">Contact Info</span>
                          <span class="value">{empDetails.phone}</span>
                          <span class="label">Aadhar No.</span>
                          <span class="value">{empDetails.aadhar_no}</span>
                        </div>

                        <div class="row">
                          <span class="label">Gender</span>
                          <span class="value">{empDetails.gender}</span>
                          <span class="label">Bank Account</span>
                          <span class="value">{empDetails.account_no}</span>
                        </div>
                        <div class="row">
                          <span class="label">Date of Birth</span>
                          <span class="value">
                            {new Date(empDetails.emp_dob).toLocaleDateString()}
                          </span>
                          <span class="label">Department</span>
                          <span class="value">{empDetails.department}</span>
                        </div>
                        <div class="row"></div>
                        <div class="row">
                          <span class="label">Pan no.</span>
                          <span class="value">{empDetails.pan_no}</span>
                          <span class="label">Other No</span>
                          <span class="value">{empDetails.other_phone}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={24} style={{ marginBottom: "-20px" }}>
                      <span className="popupTitle">Address</span>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="client_name"></Form.Item>
                      <div class="container">
                        <div class="row">
                          <span class="label">Permanent Address</span>
                          <br />
                          <span class="value">{empDetails.p_address}</span>

                          <span class="label">Temporary Address</span>
                          <br />

                          <span class="value">{empDetails.t_address}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Spin>
      </Modal>
    </>
  );
};
export default LayoutEmp;
