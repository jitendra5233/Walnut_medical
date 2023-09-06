import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  HomeFilled,
  LogoutOutlined,
  SettingOutlined,
  ApiOutlined,
  CloudUploadOutlined,
  CodepenOutlined,
  CheckSquareOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Card, Menu, Avatar, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAc } from "../../Redux/Actions";
import axios from "axios";

const SideBar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.persistedReducer);

  const [menuList, setMenuList] = useState([]);
  const [userAccess, setUserAccess] = useState([]);
  const [ActiveRoleName, setActiveRoleName] = useState();

  useEffect(() => {
    getUserRole();
  }, []);

  const handleLogout = () => {
    dispatch(handleLogoutAc());
    navigate("/login");
  };

  const getUserRole = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getRole")
      .then((result) => {
        result.data.map((x) => {
          if (x._id == selector.user.role) {
            setActiveRoleName(x.name);
            setUserAccess(x.access);
            createMenuList(x.access);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createMenuList = (access) => {
    let AllMenu = [
      {
        id: 1,
        key: "dashboard",
        name: "Dashboard",
        icon: <HomeFilled className="sidebarIcon" />,
        link: "/",
        SubMenu: false,
      },

      {
        id: 2,
        key: "PostApi",
        name: "Show POST Data",
        icon: <ApiOutlined className="sidebarIcon" />,
        link: "/PostApi",
        SubMenu: false,
      },
      {
        id: 3,
        key: "FileUpload",
        name: "Upload Files",
        icon: <CloudUploadOutlined className="sidebarIcon" />,
        link: "/FileUpload",
        SubMenu: false,
      },
      {
        id: 4,
        key: "UserAndRole",
        name: "User & Role's",
        icon: <UserOutlined className="sidebarIcon" />,
        link: "/",
        SubMenu: true,
        SubMenuItems: [
          {
            id: 5,
            key: "ManageUser",
            link: "/ManageUser",
            name: "User Managemeant",
          },
          {
            id: 6,
            key: "ManageRole",
            link: "/ManageRole",
            name: "Role Managemeant",
          },
        ],
      },
      {
        id: 7,
        key: "oqc",
        name: "Master Carton",
        icon: <CodepenOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 8,
        key: "oqc",
        name: "Checked",
        icon: <CheckSquareOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 10,
        key: "oqc",
        name: "Review Status",
        icon: <FileDoneOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 11,
        key: "lqc",
        name: "Sound Box",
        icon: <CodepenOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 12,
        key: "lqc",
        name: "Checked",
        icon: <CheckSquareOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 13,
        key: "lqc",
        name: "Review Status",
        icon: <FileDoneOutlined className="sidebarIcon" />,
        link: "/oqc",
        SubMenu: false,
      },
      {
        id: 98,
        key: "settings",
        name: "Settings",
        icon: <SettingOutlined className="sidebarIcon" />,
        link: "/settings",
        SubMenu: false,
      },
      {
        id: 99,
        key: "logout",
        name: "Logout",
        icon: <LogoutOutlined className="sidebarIcon" />,
        link: "/",
        SubMenu: false,
      },
    ];

    let countID = 1;
    let ActiveMenu = [];

    access.map((x) => {
      AllMenu.map((y) => {
        if (x.key === y.key) {
          y.id = countID;
          ActiveMenu.push(y);
          countID++;
        }
      });
    });

    AllMenu.map((x) => {
      if (x.key === "settings") {
        ActiveMenu.push(x);
        countID++;
      }
      if (x.key === "logout") {
        ActiveMenu.push(x);
        countID++;
      }
    });

    let adminCount = 1;
    access.map((x) => {
      if (x.key === "admin") {
        ActiveMenu = [];
        AllMenu.map((z) => {
          if (z.key != "oqc" && z.key != "lqc") {
            z.id = adminCount;
            ActiveMenu.push(z);
            adminCount++;
          }
        });
      }
    });

    setMenuList(ActiveMenu);
  };

  return (
    <Sider
      style={{
        backgroundColor: "#C9D5E3",
        overflow: "auto",
        height: "100vh",
        position: "relative",
      }}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      width={250}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <img src="./logo.png" alt="" style={{ padding: "15px 20px 30px" }} />
      </div>

      <Menu
        style={{ backgroundColor: "#C9D5E3" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        {menuList.map((x) => {
          if (x.SubMenu) {
            return (
              <SubMenu
                key={x.id}
                title={
                  <span>
                    <span style={{ marginRight: "5px" }}>{x.icon}</span>
                    <span>{x.name}</span>
                  </span>
                }
              >
                {x.SubMenuItems.map((sub) => {
                  return (
                    <Menu.Item key={sub.key}>
                      <Link to={sub.link}>{sub.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          } else {
            if (x.key === "logout") {
              return (
                <Menu.Item key={x.id}>
                  <div style={{ display: "flex" }}>
                    <div>{x.icon}</div>
                    <div>
                      <Link className="menuText" onClick={() => handleLogout()}>
                        {x.name}
                      </Link>
                    </div>
                  </div>
                </Menu.Item>
              );
            } else {
              return (
                <Menu.Item key={x.id}>
                  <div style={{ display: "flex" }}>
                    <div>{x.icon}</div>
                    <div>
                      <Link to={x.link} className="menuText">
                        {x.name}
                      </Link>
                    </div>
                  </div>
                </Menu.Item>
              );
            }
          }
        })}
      </Menu>
      <div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            padding: "0 10px",
            width: "100%",
          }}
        >
          <Card className="sidebarDiv">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <Avatar
                  size={35}
                  src={
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/${selector.user.photo}`}
                      alt="avatar"
                    />
                  }
                  style={{ marginRight: "15px" }}
                />
              </div>
              <div>
                <div>
                  <span className="appBarUserName">
                    {selector.user.f_name} {selector.user.l_name}
                  </span>
                </div>
                <div>
                  <span className="appBarUserType"> {ActiveRoleName}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Sider>
  );
};

export default SideBar;
