import DefaultLayout from "../Components/DefaultLayout";
import { Button, Form, Input, Select, Upload, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { EditOutlined } from "@ant-design/icons";

const BillPage = () => {
  const [popUpModal, setPopUpModal] = useState(false);
  const [billsData, setBillsData] = useState([]);
  const [editItems, setEditItems] = useState(null);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact Number", dataIndex: "customerNumber" },
    { title: "Total Amount", dataIndex: "totalAmount" },


  ];

  const getAllBills = async () => {
    try {
      const { data } = await axiosInstance.get("/api/bills/get-bills");
      setBillsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    getAllBills();
  }, []);
  return (
    <DefaultLayout>
      <div className="tableAndItem">
        <Table columns={columns} dataSource={billsData} />

        {popUpModal && (
          <Modal
            className="addItemModal"
            title={`${editItems !== null ? "Edit Items" : "Add New Item"}`}
            open={popUpModal}
            onCancel={() => {
              setEditItems(null);
              setPopUpModal(false);
            }}
            footer={false}
          ></Modal>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BillPage;
