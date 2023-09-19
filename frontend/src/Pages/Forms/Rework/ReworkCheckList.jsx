import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Modal,
  Spin,
  Form,
  message,
  Select,
  Upload,
  Table,
} from "antd";

import { LogoutOutlined, EyeOutlined } from "@ant-design/icons";
import { logoutActiveLine } from "../../../Redux/Actions";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ReworkCheckList = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [tableData, setTableData] = useState([]);
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    getSoundboxlinequalitychecklist();
  }, []);

  const getSoundboxlinequalitychecklist = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/getAllCheckedSoundboxlist`;
    axios
      .get(apiUrl)
      .then((result) => {
        const data = result.data;
        let newData = [];
        data.forEach((item, index) => {
          const { _id, Soundboxlinequalitychecklist, ...rest } = item;
          Soundboxlinequalitychecklist.forEach((x, subIndex) => {
            newData.push({
              key: `${index}-${subIndex}`,
              id: _id,
              lqcl: x.lqcl,
              status: x.status,
              defect_category: x.defect_category,
              remarks: x.remarks,
              picture: x.picture,
              analysis_details: x.analysis_details,
              batch_number: rest.batch_number,
              ref_IMEI: rest.ref_IMEI,
              line_name: rest.line_name,
            });
          });
        });

        setTableData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Batch Number",
      dataIndex: "batch_number",
      key: "batch_number",
    },
    {
      title: "Line Number",
      dataIndex: "line_name",
      key: "line_name",
    },
    {
      title: "IMEI Code",
      dataIndex: "ref_IMEI",
      key: "ref_IMEI",
    },
    {
      title: "Line quality check list",
      dataIndex: "lqcl",
      key: "lqcl",
    },

    {
      title: "Defect Category",
      dataIndex: "defect_category",
      key: "defect_category",
      render: (_, record) => (
        <Select
          placeholder="Select Any Defect"
          allowClear
          style={{ minWidth: "250px", textAlign: "center" }}
          value={record.defect_category}
        >
          <Option value="Select Any Defect">Select Any Defect</Option>
          <Option value="Functional">Functional</Option>
          <Option value="Aesthetic">Aesthetic</Option>
          <Option value="Missing category">Missing category</Option>
          <Option value="Other">Other</Option>
        </Select>
      ),
    },
    {
      title: "Pictures",
      dataIndex: "picture",
      key: "picture",
      render: (_, record) => (
        <div style={{ paddingRight: "20px" }}>
          {record.picture ? (
            <div
              style={{
                paddingRight: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "3px" }}>{record.picture}</span>
              <Button
                icon={<EyeOutlined />}
                onClick={() => handleImageClick(record.picture)}
                style={{ border: "none" }}
              />
              <Modal
                visible={previewImage !== null}
                onCancel={handleImageClose}
                footer={null}
              >
                <img
                  alt="Preview"
                  src={`${process.env.REACT_APP_API_URL}/SoundImages/${previewImage}`}
                  style={{ width: "100%" }}
                />
              </Modal>
            </div>
          ) : (
            <span>No image available</span>
          )}
        </div>
      ),
    },

    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (_, record) => (
        <TextArea value={record.remarks} style={{ width: "220px" }} />
      ),
    },
    {
      title: "Analysis Details",
      dataIndex: "analysis_details",
      key: "analysis_details",
      render: (_, record) => (
        <TextArea value={record.analysis_details} style={{ width: "220px" }} />
      ),
    },

    {
      title: "Status",
      key: "Review",
      render: (_, record) => (
        <div>
          <a>
            <span>
              <Button key="buy" type="primary" className="circular-button">
                {record.status}
              </Button>
            </span>
          </a>
        </div>
      ),
    },
  ];

  const handleImageClick = (picture) => {
    setPreviewImage(picture);
  };

  const handleImageClose = () => {
    setPreviewImage(null);
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <span className="TopMenuTxt">Fixed items list</span>
        </Col>
      </Row>

      <Row style={{ marginTop: "2rem" }}>
        <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={tableData}
              style={{ marginTop: "15px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          ></div>
        </Col>
      </Row>
    </div>
  );
};

export default ReworkCheckList;
