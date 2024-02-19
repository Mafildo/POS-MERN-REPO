import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  InboxOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faHouse,
  faMoneyBills,
  faUser,
  faArrowRightFromBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Layout, Menu, theme } from "antd";
import "../Styles/DefaultLayout.css";
const { Header, Content, Sider } = Layout;
const items = [
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  InboxOutlined,
  HomeOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical">
          <h3 align="center" className="demo-logo-vertical-h3">
            POS
          </h3>
        </div>
        <Menu
          className="menu-container"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/homepage" icon={<FontAwesomeIcon icon={faHouse} />}>
            <Link to="/homepage" className="menu">
              Home
            </Link>
          </Menu.Item>

          <Menu.Item key="/items" icon={<FontAwesomeIcon icon={faBowlFood} />}>
            <Link to="/items" className="menu">
              Items
            </Link>
          </Menu.Item>

          <Menu.Item
            key="/bills"
            icon={<FontAwesomeIcon icon={faMoneyBills} />}
          >
            <Link to="/bills" className="menu">
              Bills
            </Link>
          </Menu.Item>

          <Menu.Item key="/customers" icon={<FontAwesomeIcon icon={faUser} />}>
            <Link to="/customers" className="menu">
              Customers
            </Link>
          </Menu.Item>

          <Menu.Item
            className="logoutDiv"
            key="/logout"
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          >
            <Link to='/'className="menu">
            Logout
            </Link>
            
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            marginLeft: 18,
            marginRight: 18,
            marginTop: 18,
            borderRadius: 8,
            background: colorBgContainer,
          }}
        >
          <div className="cart-item" onClick={() => navigate("/cart")}>
            <div>
              <p className="cart-item-p-word">View Orders</p>
            </div>

            <div className="cart-items">
              <p className="cart-item-p-num">{cartItems.length}</p>
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
          </div>
        </Header>
        <Content
          className="layout-content"
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="content-div"
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
