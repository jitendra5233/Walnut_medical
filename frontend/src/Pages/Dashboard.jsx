import React from "react";
import { Row, Col, Card, Progress, Tooltip, Avatar } from "antd";

const myStyle = {
  cardTxtContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
};

const CardComp = ({
  title,
  totalNo,
  onetxt,
  twotxt,
  threetxt,
  sno1,
  sno2,
  sno3,
  sno4,
}) => {
  console.log(title);
  return (
    <Card className="dashboardCard">
      <div style={myStyle.cardTxtContainer}>
        <span className="dashboardCardTxt">{title}</span>
        <span>{totalNo}</span>
      </div>
      <div style={{ margin: "15px 0" }}>
        <Progress
          showInfo={false}
          percent={100}
          success={{
            percent: 60,
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
              backgroundColor: "#52c41a",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          {onetxt}
        </div>
        <div>
          {sno1} {sno2}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor: "#1677ff",
              verticalAlign: "middle",
              width: "12px",
              height: "12px",
              marginRight: "5px",
            }}
            size="small"
          />
          {twotxt}
        </div>
        <div>
          {sno3} {sno4}
        </div>
      </div>
      {threetxt != "" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#1FBCDE",
                verticalAlign: "middle",
                width: "12px",
                height: "12px",
                marginRight: "5px",
              }}
              size="small"
            />
            {threetxt}
          </div>
          <div>
            {sno3} {sno4}
          </div>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Total No of employees"
            totalNo="60"
            onetxt="Permanent"
            twotxt="Contract"
            threetxt=""
            sno1="40"
            sno2="60%"
            sno3="40"
            sno4="60%"
          />
        </Col>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Total items in inventory"
            totalNo="60"
            onetxt="Given"
            twotxt="Lost"
            threetxt="Damaged"
            sno1="40"
            sno2="60%"
            sno3="40"
            sno4="60%"
          />
        </Col>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Job positions this month"
            totalNo="60"
            onetxt="Offer"
            twotxt="Hired"
            threetxt="Opening"
            sno1="40"
            sno2="60%"
            sno3="40"
            sno4="60%"
          />
        </Col>
        <Col span={12} style={{ padding: "20px" }}>
          <CardComp
            title="Client Accounts"
            totalNo="60"
            onetxt="Existing Client"
            twotxt="Old Clients"
            threetxt="Total Clients"
            sno1="40"
            sno2="60%"
            sno3="40"
            sno4="60%"
          />
        </Col>
      </Row>
    </div>
  );
};
