import React, { useState, useEffect } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, Form, Select, Input, message } from "antd";
import "../Styles/CartPage.css";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../Utils/axiosInstance";

const CartPage = () => {

  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        totalAmount: total,
        // userId: JSON.parse(localStorage.getItem("auth"))._id
      };
      if(value){
        await axiosInstance.post('api/bills/add-bills', newObject)
        message.success("Bill Generated");
        navigate('/bills');
      }else{
        message.error("Something went wrong! Please try again.");

      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (record) => {
    dispatch({
      type: "Update_cart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "Update_cart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const handleDelete = (sno) => {
    dispatch({
      type: "DeleteFromCartBySNo",
      payload: sno,
    });
  };

  const { cartItems } = useSelector((state) => state.rootReducer);

  // Generate unique IDs for items in the cart
  const cartItemsWithUniqueId = cartItems.map((item) => ({
    ...item,
    uniqueId: uuidv4(),
  }));

  const renderSNo = (index) => {
    return index + 1;
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="50px" width="60px" />
      ),
    },
    { title: "Price", dataIndex: "price", render: (price) => "Rs. " + price },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <div className="quantityDetails">
          <PlusCircleOutlined
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => handleIncrement(record)}
          />
          <p
            className="quantity-p"
            style={{ minWidth: "20px", textAlign: "center" }}
          >
            {quantity}
          </p>
          <MinusCircleOutlined
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "sno",
      render: (sno, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={() => handleDelete(sno)}
        />
      ),
    },
  ];

  const cartItemsWithSNo = cartItemsWithUniqueId.map((item, index) => ({
    ...item,
    sno: renderSNo(index),
  }));

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setTotal(temp);
  }, [cartItems]);

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItemsWithSNo} />
      <div className="d-flex flex-column align-item-end">
        <hr />
        <h4>Total Price: $ {total} </h4>
        <Button type="primary" onClick={() => setBillPopUp(true)}>
          Create Invoice
        </Button>
      </div>

      <Modal
        title="Create Invoice"
        open={billPopUp}
        onCancel={() => setBillPopUp(false)}
        footer={false}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          style={{
            maxWidth: 900,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="C Name" name="customerName">
            <Input />
          </Form.Item>
          <Form.Item label="Contact" name="customerNumber">
            <Input />
          </Form.Item>
          <Form.Item label="paymentMode" name="paymentMode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="online">Online</Select.Option>
            </Select>
          </Form.Item>

          <h5>Total Price: $ {total} </h5>

          <Form.Item
            wrapperCol={{
              span: 15,
              offset: 9,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }}
            >
              Generate Bill
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
