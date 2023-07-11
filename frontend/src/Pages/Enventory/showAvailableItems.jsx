import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import {
  Table,
  Modal,
  Typography,
  Form,
} from "antd";
const { Title } = Typography;

const ShowAvailableItems = () => {
const [tableData, setTableData] = useState([]);
const [form]=Form.useForm();
  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = () => {
    axios
      .get('http://localhost:5000/getItemrecord')
      .then((result) => {
        let data = result.data;
        let newData = [];
        console.log(data);
        data.map((x) => {
          const createdAt = new Date(x.createdAt);
          const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
          newData.push({
            item_name: x.item_name,
            quantity: x.quantity,
            createdAt: formattedCreatedAt,
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
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: "Created Date/Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    // {
    //   title: "Updated Date",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    // },
  ];

  return (
    <div>
      <div className="m12r">
        <Title level={3} className="Expensecolor">Show Item Record</Title>
        <Link to={`/inventory-item`}>
          <button className="filtercolorbtn">Total items</button>
        </Link>
        <Link to={`/add-issued`}>
          <button className="filtercolorbtn">Assign Item +</button>
        </Link>
        <Link to={`/show_itemrecord`}>
          <button className="filtercolorbtn">Show Record</button>
        </Link>
      </div>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default ShowAvailableItems;
