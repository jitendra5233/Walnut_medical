import { useState, useEffect } from "react";

import {
  PieChartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Avatar, Popover } from "antd";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAc } from "../Redux/Actions";

const { Header, Sider, Content } = Layout;

const App = () => {
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
    <div>
      <Button type="primary" block danger onClick={() => handleLogout()}>
        Logout
      </Button>
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
    <Layout theme="light">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <img
          src="../../logo.png"
          alt=""
          style={{ width: "95%", padding: "1.3rem 1rem 3rem" }}
        />

        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <span style={{ marginRight: "5px" }}>
              <HomeFilled />
            </span>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <span style={{ marginRight: "5px" }}>
                  <UserOutlined />
                </span>
                <span>Hiring</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <span style={{ marginRight: "5px" }}>
                <UserOutlined />
              </span>
              <Link to="/users">Employee</Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="new-user">New Employee</Link>
            </Menu.Item>

            {/* <Menu.Item key="4">
              <Link to="/roles">Role</Link>
            </Menu.Item>

            <Menu.Item key="5">
              <Link to="add-role">Add Role</Link>
            </Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Popover
            placement="bottom"
            title={`${f_name} ${l_name}`}
            content={content}
            trigger="click"
          >
            <Avatar
              src={<img src={url} alt="avatar" />}
              style={{ margin: " 0 15px" }}
            />
          </Popover>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "83vh",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
