import React, { useState } from "react";
import { Row, Col, Card, Progress, Avatar, List, Table, Button } from "antd";

const myStyle = {
  cardTxtContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const CardComp = () => {
  return (
    <Card className="dashboardCard" style={{ height: "310px" }}>
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">Total No of sound box</span>
        <span>500</span>
      </div>
      <div style={{ margin: "15px 0" }}>
        <Progress
          showInfo={false}
          trailColor="#C9D5E3"
          strokeColor="#5b7690"
          percent={70}
          success={{
            percent: 40,
            strokeColor: "#2b3b50",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#2B3E50",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Checked
        </div>
        <div>140</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#5B7690",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Damaged
        </div>
        <div>20</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#7D9EBD",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Up for review
        </div>
        <div>15</div>
      </div>
    </Card>
  );
};
const CardComp2 = () => {
  return (
    <Card className="dashboardCard" style={{ height: "310px" }}>
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">Total Material in IQC</span>
        <span>190</span>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <Progress
          percent={60}
          strokeColor="#5B7690"
          success={{
            percent: 30,
            strokeColor: "#2B3E50",
          }}
          trailColor="#C9D5E3"
          type="circle"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#2B3E50",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Accepted
        </div>
        <div>140</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              backgroundColor: "#5B7690",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Rejected
        </div>
        <div>20</div>
      </div>
    </Card>
  );
};

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const CardComp3 = () => {
  return (
    <Card className="dashboardCard" style={{ height: "310px" }}>
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">Employees Details</span>
        <span>190</span>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{ height: "200px", overflow: "auto" }}
          renderItem={(item, index) => (
            <List.Item
              style={{
                textAlign: "left",
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src="./icon/userImg.png" />}
                title={<span>Employee Name</span>}
                description="Designation"
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

const CardComp4 = () => {
  const [ApiData, setApiData] = useState([
    {
      carton_id: "HGDGUDHJS3759",
      language: "HINDI",
      check_list: "Bopp tape sticked nicely",
      status: "Not Ok",
    },
    {
      carton_id: "HGDGUDHJS3759",
      language: "HINDI",
      check_list: "Bopp tape sticked nicely",
      status: "Not Ok",
    },
    {
      carton_id: "HGDGUDHJS3759",
      language: "HINDI",
      check_list: "Bopp tape sticked nicely",
      status: "Not Ok",
    },
    {
      carton_id: "HGDGUDHJS3759",
      language: "HINDI",
      check_list: "Bopp tape sticked nicely",
      status: "Not Ok",
    },
    {
      carton_id: "HGDGUDHJS3759",
      language: "HINDI",
      check_list: "Bopp tape sticked nicely",
      status: "Not Ok",
    },
  ]);

  const columns = [
    {
      title: "Master carton ID",
      dataIndex: "carton_id",
      key: "carton_id",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (x) => <div style={{ maxWidth: "700px" }}>{x}</div>,
    },
    {
      title: "Outgoing Quality Check list",
      dataIndex: "check_list",
      key: "check_list",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (x) => <div style={{ maxWidth: "700px" }}>{x}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (id) => {
        return (
          <div style={{ cursor: "pointer", textAlign: "center" }}>
            <Button>Review</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card
      className="dashboardCard dashboardCard2"
      style={{ height: "400px", overflow: "hidden" }}
    >
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt" style={{ padding: "24px" }}>
          Up for review
        </span>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <div style={{ marginTop: "25px" }}>
          <Table
            columns={columns}
            dataSource={ApiData}
            pagination={{
              position: ["none", "none"],
            }}
          />
        </div>
      </div>
    </Card>
  );
};

const CardComp5 = () => {
  return (
    <Card
      className="dashboardCard"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <div>No data</div>
    </Card>
  );
};

export const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col span={8} style={{ padding: "20px" }}>
          <CardComp />
        </Col>
        <Col span={8} style={{ padding: "20px" }}>
          <CardComp2 />
        </Col>

        <Col span={8} style={{ padding: "20px" }}>
          <CardComp3 />
        </Col>

        <Col span={16} style={{ padding: "20px" }}>
          <CardComp4 />
        </Col>
        <Col span={8} style={{ padding: "20px" }}>
          <CardComp5 />
        </Col>
      </Row>
    </div>
  );
};
