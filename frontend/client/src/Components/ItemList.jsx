import React from "react";
import { Card } from "antd";
import "../Styles/ItemList.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch()

  const handleAddtoCart = () => {
    dispatch({
      type: 'addToCart',
      payload: {...item, quantity: 1}
    });
    console.log("add to cart");
  }
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 255,
          marginBottom: 14,
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 230 }} />}
      >
        <div className="title-price-addToCartBtn">
          <Meta title={item.name} />

          <div className="price-addToCartBtn">
            <h6> Rs. {item.price}</h6>
            <button className="shoppingCartOutlined" onClick={handleAddtoCart}>
              <ShoppingCartOutlined />
              Add to cart
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
