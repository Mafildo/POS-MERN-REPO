import React, { useState, useEffect } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axiosInstance from "../Utils/axiosInstance";
import { Col, Row } from "antd";
import ItemList from "../Components/ItemList"

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);

  //useeffect

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axiosInstance.get("/api/items/get-items");
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <Row >
        {itemsData.map((item, index) => (
          <Col key={index} xs={24} lg={6} md={20} sm={5} >
            <ItemList item={item} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
