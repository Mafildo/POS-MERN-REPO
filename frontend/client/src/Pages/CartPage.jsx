// import React from "react";
// import DefaultLayout from "../Components/DefaultLayout";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   DeleteOutlined,
//   PlusCircleOutlined,
//   MinusCircleOutlined,
// } from "@ant-design/icons";
// import { Table } from "antd";
// import "../Styles/CartPage.css";


// const CartPage = () => {
//   const dispatch = useDispatch();
//   const handleIncrement = (record) => {
//     dispatch({
//       type: "Update_cart",
//       payload: { ...record, quantity: record.quantity + 1 },
//     });
//   };

//    const handleDecrement = (record) => {
//     if(record.quantity !== 1){
//         dispatch({
//             type: "Update_cart",
//             payload: { ...record, quantity: record.quantity - 1 },
//           });
//     }
//   };

//   const { cartItems } = useSelector((state) => state.rootReducer);

//   const columns = [
//     { title: "Name", dataIndex: "name" },
//     {
//       title: "Image",
//       dataIndex: "image",
//       render: (image, record) => (
//         <img src={image} alt={record.name} height="50px" width="60px" />
//       ),
//     },
//     { title: "Price", dataIndex: "price", render: (price) => "Rs. " + price },
//     {
//       title: "Quantity",
//       dataIndex: "_id",
//       render: (id, record) => (
//         <div style={{ display: "flex", gap: "15px" }}>
//           <PlusCircleOutlined
//             style={{ cursor: "pointer", fontSize: "20px" }}
//             onClick={() => handleIncrement(record)}
//           />
//           <b>{record.quantity}</b>
//           <MinusCircleOutlined style={{ cursor: "pointer", fontSize: "20px" }}
//            onClick={() => handleDecrement(record)}/>
//         </div>
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "_id",
//       render: (id, record) => (<DeleteOutlined 
//       style={{ cursor: "pointer", fontSize: "20px" }}
//             onClick={() => dispatch({
//                 type: 'DeleteFromCart',
//                 payload: record
//             })}
//             />
//             )
//     },
//   ];
//   return (
//     <DefaultLayout>
//       <Table columns={columns} dataSource={cartItems}></Table>
//     </DefaultLayout>
//   );
// };

// export default CartPage;

import React from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import "../Styles/CartPage.css";
import { v4 as uuidv4 } from "uuid";

const CartPage = () => {
  const dispatch = useDispatch();

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
           <p className="quantity-p" style={{ minWidth: "20px", textAlign: "center" }}>{quantity}</p>
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

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItemsWithSNo} />
    </DefaultLayout>
  );
};

export default CartPage;

