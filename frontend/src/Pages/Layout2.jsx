import React, { useState, useEffect } from "react";

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
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Avatar,
  Popover,
  Input,
  Row,
  Col,
} from "antd";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAc } from "../Redux/Actions";

const { Header, Content, Footer, Sider } = Layout;

const LayoutCom2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.persistedReducer);
  const [collapsed, setCollapsed] = useState(false);
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");

  const { SubMenu } = Menu;

  useEffect(() => {
    checkLogin();
    setProfile();
  }, []);

  const setProfile = () => {
    let user = selector.user;
    setFName(user.f_name);
    setLName(user.l_name);
  };

  const checkLogin = () => {
    if (!selector.isLogin) {
      navigate("/login");
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
        <h4>Harmanpreet Singh</h4>
      </div>
      <div>
        <h5>Admin</h5>
      </div>
      <div style={{ margin: "10px 0 0 0" }}>
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
  return (
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
        <img
          src="../../logo.png"
          alt=""
          style={{ width: "100%", padding: "44px 24px" }}
        />
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

          <SubMenu
            key="sub1"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <GlobalOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Client Account</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <Link to="/users">Client Details</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/users">Account Info</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/users">Old Clients</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <DropboxOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Inventory</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/issued">Inventory Details</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/loss_Damage">Lost/dameged</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <ContactsOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Document/Details</span>
              </span>
            }
          >
            <Menu.Item key="7">
              <Link to="/users">All Employees</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/users">Old Employees</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <UserOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Hiring</span>
              </span>
            }
          >
            <Menu.Item key="10">
              <Link to="/hiring">New hiring</Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/show-hired-candidate">New Employee Info</Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/show-rejected-candidate">Rejected Candidate</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <QuestionOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Employee Inquiry</span>
              </span>
            }
          >
            <Menu.Item key="13">
              <Link to="/users">Anonymous message</Link>
            </Menu.Item>
            <Menu.Item key="14">
              <Link to="/users">Employee message</Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/users">All message</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <SettingOutlined
                    style={{
                      fontSize: "15px",
                      margin: "10px 10px 0px",
                    }}
                  />
                </span>
                <span>Other</span>
              </span>
            }
          >
            <Menu.Item key="17">
              <Link to="/users">Company Accounts</Link>
            </Menu.Item>
            <Menu.Item key="18">
              <Link to="/expense">Office expenses</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="19">
            <div style={{ display: "flex" }}>
              <div>
                <LogoutOutlined
                  style={{
                    fontSize: "15px",
                    margin: "10px 10px 0px",
                  }}
                />
              </div>
              <div>
                <Link to="/" className="menuText">
                  Exit
                </Link>
              </div>
            </div>
          </Menu.Item>

          <div className="menuHeading">
            <span className="menuHeadingTxt">Other options</span>
          </div>

          <Menu.Item key="20">
            <div style={{ display: "flex" }}>
              <div>
                <ShareAltOutlined
                  style={{
                    fontSize: "15px",
                    margin: "10px 10px 0px",
                  }}
                />
              </div>
              <div>
                <Link to="/users" className="menuText">
                  Manage Accounts
                </Link>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="21">
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
                <Link to="/" className="menuText">
                  Settings
                </Link>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="22">
            <div style={{ display: "flex" }}>
              <div>
                <LogoutOutlined
                  style={{
                    fontSize: "15px",
                    margin: "10px 10px 0px",
                  }}
                />
              </div>
              <div>
                <Link to="/" className="menuText">
                  Logout
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
            <Col span={8} className="h64p">
              <Input
                size="large"
                className="appBarSearchIpt"
                placeholder="Enter your username"
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Col>
            <Col span={8} className="h64p">
              <Row>
                <Col
                  span={10}
                  className="h64p"
                  style={{ textAlign: "end", cursor: "pointer" }}
                >
                  <img
                    style={{ width: "22px", margin: "22px  0" }}
                    src="/icon/bellicon.svg"
                  />
                </Col>
                <Col span={4} className="h64p">
                  <Avatar
                    size={35}
                    src={<img src="/icon/userImg.png" alt="avatar" />}
                    style={{ margin: " 0 15px" }}
                  />
                </Col>
                <Col span={10} className="h64p" style={{ cursor: "pointer" }}>
                  <Popover placement="bottom" content={content} trigger="click">
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
                        src="/icon/ArrowDown.png"
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
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutCom2;
