import React, { useState, useEffect } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axiosInstance from "../Utils/axiosInstance";
import { Col, Row } from "antd";
import ItemList from "../Components/ItemList";
import cheers from "../Images/cheers.png";
import rice from "../Images/rice.png";
import noodles from "../Images/noodles.png";

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Drink");
  const categories = [
    {
      name: "Drink",
      imageUrl: cheers,
    },
    {
      name: "Rice",
      imageUrl: rice,
    },
    {
      name: "Noodle",
      imageUrl: noodles,
    },
  ];

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
      <div className="d-flex main-container">
        {categories.map((category) => {
          return (
            <div
              key={category.name}
              className={`d-flex category ${
                selectedCategory === category.name && `category-active`
              }`}
              onClick={() => {
                return setSelectedCategory(category.name);
              }}
            >
              <h6>{category.name}</h6>
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40"
                width="40"
              />
            </div>
          );
        })}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item, index) => (
            <Col key={index} xs={24} lg={6} md={20} sm={5}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
