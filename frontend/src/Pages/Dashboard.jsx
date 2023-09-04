import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Progress,
  Tooltip,
  Avatar,
  List,
  Typography,
  Table,
  Button,
} from "antd";
import axios from "axios";
const myStyle = {
  cardTxtContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
};

const CardComp = () => {
  return (
    <Card className="dashboardCard" style={{ height: "350px" }}>
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">Total No of sound box</span>
        <span>500</span>
      </div>
      <div style={{ margin: "15px 0" }}>
        <Progress
          showInfo={false}
          strokeColor="#C9D5E3"
          percent={100}
          success={{
            percent: 60,
            strokeColor: "#5B7690",
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
              backgroundColor: "#91B2D1",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          Out for LQC
        </div>
        <div>120</div>
      </div>
    </Card>
  );
};
const CardComp2 = () => {
  return (
    <Card className="dashboardCard" style={{ height: "350px" }}>
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
    <Card className="dashboardCard" style={{ height: "350px" }}>
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
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
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
    <Card className="dashboardCard" style={{ height: "550px" }}>
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">Up for review</span>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <div style={{ marginTop: "25px" }}>
          <Table
            columns={columns}
            dataSource={ApiData}
            pagination={{
              position: ["none", "none"],
            }}
            scroll={{
              y: 350,
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
        height: "550px",
      }}
    >
      <div>No data</div>
    </Card>
  );
};

export const Dashboard = () => {
  useEffect(() => {
    getJobPositions();
    getAllEmployee();
    totalItemQuantity();
    getAssignedItemWithPercentage();
    totalClientwithPercentage();
  }, []);
  const [EmployeeCount, setEmployeeCount] = useState("2");
  const [InterEmployee, setInterEmployee] = useState("1");
  const [PermanentEmployee, setPermanentEmployee] = useState("1");
  const [PermanentEmpPer, setPermanentEmpPer] = useState("0%");
  const [InterEmpPer, setInterEmpPer] = useState("0%");
  const [JobPositions, setJobPositions] = useState("0");
  const [hiredCandidate, sethiredCandidate] = useState("0");
  const [hiredCandidatePer, sethiredCandidatePer] = useState("0%");
  const [jobOpeningPer, setjobOpeningPer] = useState("0%");
  const [TotalItem, setTotalItem] = useState("0");
  const [AssignedItem, setAssignedItem] = useState("0");
  const [AssignedItemPer, setAssignedItemPer] = useState("0%");
  const [TotalAvailableItem, setTotalAvailableItem] = useState("0");
  const [totalAvailableItemPer, settotalAvailableItemPer] = useState("0%");
  const [TotalLossDamageItem, setTotalLossDamageItem] = useState("0");
  const [totalLossDamageItemPer, settotalLossDamageItemPer] = useState("0%");
  const [totalClient, setTotalClient] = useState("0");
  const [newClient, setNewClient] = useState("0");
  const [oldClient, setOldClient] = useState("0");
  const [newClientPer, setNewClientPer] = useState("0%");
  const [oldClientPer, setOldClientPer] = useState("0");
  const [totalClientPer, setTotalClientPer] = useState("0%");

  const getAllEmployee = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getAllEmployeedata")
      .then((result) => {
        let data = result.data;
        setPermanentEmployee(data.permanent);
        setEmployeeCount(data.totalEmployeeCount);
        setPermanentEmpPer(data.PermanentEmpPer + "%");
        setInterEmployee(data.intern);
        setInterEmpPer(data.InterEmpPer + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobPositions = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getJobPositions")
      .then((result) => {
        let data = result.data;
        setJobPositions(data.jobPositionCount);
        sethiredCandidate(data.hiredEmployee);
        sethiredCandidatePer(data.hiredCandidatePer + "%");
        setjobOpeningPer(data.jobOpeningper + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalItemQuantity = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/totalItemQuantity")
      .then((result) => {
        let data = result.data;
        setTotalItem(data.totalQuantity);
        setTotalAvailableItem(data.totalAvailableQuantity);
        settotalAvailableItemPer(data.totalAvailableItemPer + "%");
        setTotalLossDamageItem(data.TotalLossAndDamageQuantity);
        settotalLossDamageItemPer(data.totalLossDamageItemPer + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAssignedItemWithPercentage = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getAssignedItemWithPercentage")
      .then((result) => {
        let data = result.data;
        setAssignedItem(data.totalAssignedQuantity);
        setAssignedItemPer(data.assignedPercentage + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalClientwithPercentage = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/totalClientwithPercentage")
      .then((result) => {
        let data = result.data;

        setTotalClient(data.totalClient);
        setNewClient(data.newClient);
        setOldClient(data.oldClient);
        setNewClientPer(data.newClientPer + "%");
        setOldClientPer(data.oldClientPer + "%");
        setTotalClientPer(data.totalClientPer + "%");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
