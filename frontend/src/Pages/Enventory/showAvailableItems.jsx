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
      .get('http://localhost:5000/getItem')
      .then((result) => {
        let data = result.data;
        let newData = [];
        data.map((x) => {
          newData.push({
            item_name: x.item_name,
            quantity: x.availableItem,
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
  ];

  return (
    <div>
      <div className="m12r">
        <Title level={3} className="Expensecolor">Show Availbale Items</Title>
        <Link to={`/inventory-item`}>
          <button className="filtercolorbtn">Total items</button>
        </Link>
      </div>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default ShowAvailableItems;
