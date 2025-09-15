import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Badge,
  Avatar,
  Space,
  Typography,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
  HistoryOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import cartsApi from "../../api/cartApi";
import { logout } from "../../pages/Auth/userSlice";
import SearchComponent from "../../pages/Product/components/Search";
import { setCartChanged } from "../../pages/Cart/cartSlice";

const { Header } = Layout;
const { Title } = Typography;

function HeaderComponent(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [userId, setUserId] = useState();
  const cartItemsCount = cartList.length;
  const cartChanged = useSelector((state) => state.cart.cartChanged);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("role");
    if (userId) {
      setIsLoggedIn(true);
      setUserId(userId);
      if (userRole === "admin" || userRole === "seller") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      try {
        const cartList = await cartsApi.getAll(userId);
        
        setCartList(cartList);
        dispatch(setCartChanged(false));
      } catch (error) {
        console.log("Failed to fetch carts list", error);
      }
    })();
  }, [userId, cartChanged]);

  const handleSearchClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleUserInfo = () => {
    navigate("/account");
  };

  const handleShop = () => {
    navigate("/order-history");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<InfoCircleOutlined />} onClick={handleUserInfo}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="2" icon={<HistoryOutlined />} onClick={handleShop}>
        Đơn mua
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogoutClick}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#1e3a8a",
        padding: "10px 50px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png?height=60&width=60"
            alt="Logo"
            style={{
              height: 50,
              width: 50,
              objectFit: "contain",
              marginRight: 10,
            }}
          />

          <Title level={4} style={{ color: "white", margin: 0 }}>
            VĂN PHÒNG PHẨM
          </Title>
        </a>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          background: "transparent",
          border: "none",
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Menu.Item key="home">
          <a href="/products">TRANG CHỦ</a>
        </Menu.Item> */}
        <Menu.Item key="office">
          <a href="/products">SẢN PHẨM</a>
        </Menu.Item>
        <Menu.Item key="school">
          <a href="/products?categoryId=66968d748675a1be4a653de2">BÚT BI</a>
        </Menu.Item>
        <Menu.Item key="art">
          <a href="/products?categoryId=66969dec8675a1be4a653e01">GIẤY</a>
        </Menu.Item>
        <Menu.Item key="about">
          <a href="/about">GIỚI THIỆU</a>
        </Menu.Item>
        <Menu.Item key="blog">
          <a href="/blog">BLOG</a>
        </Menu.Item>
        {/* <Menu.Item key="sale">
          <a href="/products/view-all">KHUYẾN MÃI</a>
        </Menu.Item> */}
      </Menu>

      {/* Right Side Icons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <Space size="middle">
                <Button
                  type="text"
                  icon={
                    <LockOutlined style={{ color: "white", fontSize: 20 }} />
                  }
                  onClick={handleAdminClick}
                />
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={
                      <UserOutlined style={{ color: "white", fontSize: 20 }} />
                    }
                  />
                </Dropdown>
              </Space>
            ) : (
              <Space size="middle">
                <Button
                  type="text"
                  icon={
                    <SearchOutlined style={{ color: "white", fontSize: 20 }} />
                  }
                  onClick={handleSearchClick}
                />
                <Badge count={cartItemsCount} size="small">
                  <Button
                    type="text"
                    icon={
                      <ShoppingCartOutlined
                        style={{ color: "white", fontSize: 20 }}
                      />
                    }
                    onClick={handleCartClick}
                  />
                </Badge>
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={
                      <UserOutlined style={{ color: "white", fontSize: 20 }} />
                    }
                  />
                </Dropdown>
              </Space>
            )}
          </>
        ) : (
          <Space size="middle">
            <Button
              type="text"
              icon={
                <FacebookOutlined style={{ color: "white", fontSize: 20 }} />
              }
              href="https://www.facebook.com"
              target="_blank"
            />
            <Button
              type="text"
              icon={
                <InstagramOutlined style={{ color: "white", fontSize: 20 }} />
              }
              href="https://www.instagram.com"
              target="_blank"
            />
            <Button
              type="text"
              icon={<UserOutlined style={{ color: "white", fontSize: 20 }} />}
              href="/login"
            />
          </Space>
        )}
      </div>

      {/* Search Dropdown */}
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            width: "100%",
            background: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 999,
          }}
        >
          <SearchComponent />
        </div>
      )}
    </Header>
  );
}

export default HeaderComponent;
