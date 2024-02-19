import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axiosInstance from "../Utils/axiosInstance";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Modal, message } from "antd";
import "../Styles/ItemPage.css";
import { Button, Form, Input, Select, Upload } from "antd";

const ItemsPage = () => {
  const [popUpModal, setPopUpModal] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [editItems, setEditItems] = useState(null);
  const [fileList, setFileList] = useState([]);

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
      title: "Action",
      dataIndex: "sno",
      render: (sno, record) => (
        <div style={{ display: "flex", gap: "25px" }}>
          <EditOutlined
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              setEditItems(record);
              setPopUpModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const getAllItems = async () => {
    try {
      const { data } = await axiosInstance.get("/api/items/get-items");
      setItemsData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    getAllItems();
  }, []);

  const handleSubmit = async (value) => {
    if (editItems === null) {
      try {
        const res = await axiosInstance.post("/api/items/add-items", value);
        message.success("Item added successfully!");
        getAllItems();
        setPopUpModal(false);
      } catch (error) {
        message.error("Something went wrong!");
        console.log(error);
      }
    } else {
      try {
        await axiosInstance.put("/api/items/edit-items", {
          ...value,
          itemId: editItems._id,
        });
        message.success("Item Edited successfully!");
        getAllItems();
        setPopUpModal(false);
      } catch (error) {
        message.error("Something went wrong!");
        console.log(error);
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      await axiosInstance.post("/api/items/delete-items", {
        itemId: record._id,
      });
      message.success("Item Deleted successfully!");
      getAllItems();
      setPopUpModal(false);
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }
  };

  // const handleUploadChange = ({ file, fileList }) => {
  //   // Update the state with the new file list
  //   setFileList(fileList);

  //   // If the upload status is done, show success message
  //   if (file.status === "done") {
  //     message.success(`${file.name} file uploaded successfully`);
  //   } else if (file.status === "error") {
  //     message.error(`${file.name} file upload failed.`)
  //     ;
      
  //   }
  // };
  return (
    <DefaultLayout>
      <div className="tableAndItem">
        <button onClick={() => setPopUpModal(true)} className="addItembtn">
          Add Item +
        </button>

        <Table columns={columns} dataSource={itemsData} />

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
              initialValues={editItems}
            >
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select>
                  <Select.Option value="Drink">Drink</Select.Option>
                  <Select.Option value="Rice">Rice</Select.Option>                  <Select.Option value="Noodle">Noodle</Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                label="Upload"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                extra="Upload your image"
              >
                <Upload action="http://localhost:8080/api/items/upload"
                listType="picture-card
                "
                onChange={handleUploadChange}
                name="image">
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item> */}

              <Form.Item name="image" label="ImageURL">
              <Input/>
              </Form.Item>
              
              <Form.Item
                wrapperCol={{
                  span: 15,
                  offset: 10,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ItemsPage;