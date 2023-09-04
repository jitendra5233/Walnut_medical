import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PostDataShow = () => {
  const [ApiData, setApiData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/getPostResponse")
      .then((result) => {
        let data = result.data;
        let newArr = [];

        data.map((x, i) => {
          newArr.push({
            no: i + 1,
            data: x.DataJson,
            date_time: new Date(x.createdAt).toLocaleString(),
            action: x._id,
          });
        });

        setApiData(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "JSON Data",
      dataIndex: "data",
      key: "data",
      render: (x) => <div style={{ maxWidth: "700px" }}>{x}</div>,
    },
    {
      title: "Date & Time",
      dataIndex: "date_time",
      key: "date_time",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (id) => {
        return (
          <div style={{ cursor: "pointer", textAlign: "center" }}>
            <DeleteOutlined
              onClick={() => handleDelete(id)}
              style={{ fontSize: "14px", color: "red" }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/deletePostResponse", { id })
      .then((result) => {
        console.log(result.data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div sty>
      <div style={{ marginTop: "25px" }}>
        <Table columns={columns} dataSource={ApiData} />
      </div>
    </div>
  );
};

export default PostDataShow;
