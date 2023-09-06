import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Result,
  Modal,
  Spin,
  Form,
  message,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const MasterCartonOQC = () => {
  const [LineModel, setLineModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const ShowtLineNumber = () => {
    showLineModel();
  };

  const showLineModel = () => {
    setLineModel(true);
  };
  const lineModelCancel = () => {
    setLineModel(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // setLoading(true);
    // axios
    //   .post(process.env.REACT_APP_API_URL + "/UpdateRole", values)
    //   .then((result) => {
    //     console.log(result.data);
    //     getData();
    //     messageApi.open({
    //       type: "success",
    //       content: "file uploaded successfully",
    //     });
    //     setLoading(false);
    //     form2.resetFields();
    //     handleCancel();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div>
      <Modal open={LineModel} onCancel={lineModelCancel} footer={[]}>
        <Spin spinning={loading}>
          {contextHolder}
          <div style={{ padding: "30px" }}>
            <Row>
              <Col span={24} style={{ marginBottom: "30px" }}>
                <span className="popupTitle">Select Line Number</span>
              </Col>
              <Col span={24}>
                <Row gutter={[20, 20]}>
                  <Col className="lineModalCol" span={12}>
                    <Button className="lineModalButton">Line number 1,2</Button>
                  </Col>
                  <Col className="lineModalCol" span={12}>
                    <Button className="lineModalButton">Line number 3,4</Button>
                  </Col>
                  <Col className="lineModalCol" span={12}>
                    <Button className="lineModalButton">Line number 5,6</Button>
                  </Col>
                  <Col className="lineModalCol" span={12}>
                    <Button className="lineModalButton">Line number 7,8</Button>
                  </Col>
                  <Col
                    className="lineModalCol"
                    span={24}
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#606060",
                        }}
                      ></span>
                      Line Login time:
                      <Input
                        style={{
                          width: "25%",
                          height: "30px",
                          borderRadius: 0,
                          margin: "0 7px",
                          textAlign: "center",
                        }}
                        value={new Date().toLocaleTimeString()}
                      />
                    </div>
                  </Col>
                  <Col className="lineModalCol" span={24}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Button className="lineModalButtonSUbmit">OK</Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Spin>
      </Modal>
      <Row>
        <Col span={12}>
          <span className="TopMenuTxt">Batch List For OQC</span>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <span style={{ margin: "0 7px" }}>
            <Button className="TopMenuButton" onClick={() => ShowtLineNumber()}>
              Select Line Number
            </Button>
          </span>
          <span style={{ margin: "0 7px" }}>
            <Button className="TopMenuButton">
              Create New Batch <PlusOutlined />
            </Button>
          </span>
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Col span={24} style={{ backgroundColor: "#fff" }}>
          <Result
            icon={<img src="./SVG/noitem.svg" />}
            subTitle="No Item Found"
          />
        </Col>
      </Row>
    </div>
  );
};

export default MasterCartonOQC;
