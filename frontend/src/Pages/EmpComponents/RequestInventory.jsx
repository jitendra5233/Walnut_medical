import { Button, Col, Row } from "antd";
import React from "react";

const RequestInventory = () => {
  return (
    <div>
      <div>
        <Row>
          <Col span={12}>Assigned Inventory</Col>
          <Col span={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <Button color="primary">Request Inventory</Button>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Button>Available Items</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RequestInventory;
