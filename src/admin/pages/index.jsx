"use client"

import { useState } from "react"
import { Layout, Menu, Dropdown, Avatar, Button } from "antd"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
// import logo from "../../assets/logo/Adidas_Logo.svg"
import { logout } from "../../pages/Auth/userSlice"
import { useDispatch } from "react-redux"

const { Header, Content, Footer, Sider } = Layout

const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState(location.pathname)

  const handleLogoutClick = () => {
    dispatch(logout())
    navigate("/")
  }

  const handleUserInfo = () => {
    navigate("/account")
  }

  const role = localStorage.getItem("role")

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
      onClick: handleUserInfo,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogoutClick,
    },
  ]

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={256}
        style={{
          background: "#f8f9fa",
          borderRight: "1px solid #e8e8e8",
        }}
      >
        <Menu
          style={{
            background: "#f8f9fa",
            border: "none",
            fontFamily: "Arial, sans-serif",
          }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item
            key="/admin/statistics/revenue"
            style={{
              ...(selectedKey === "/admin/statistics/revenue"
                ? {
                    background: "#2c3e50",
                    color: "white",
                    fontWeight: "600",
                  }
                : {
                    color: "#2c3e50",
                    fontWeight: "500",
                  }),
              margin: "4px 8px",
              borderRadius: "6px",
              border: selectedKey !== "/admin/statistics/revenue" ? "1px solid #e8e8e8" : "none",
            }}
          >
            <Link to="/admin/statistics/revenue">📊 Quản lý doanh thu</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/products"
            style={{
              ...(selectedKey === "/admin/products"
                ? {
                    background: "#2c3e50",
                    color: "white",
                    fontWeight: "600",
                  }
                : {
                    color: "#2c3e50",
                    fontWeight: "500",
                  }),
              margin: "4px 8px",
              borderRadius: "6px",
              border: selectedKey !== "/admin/products" ? "1px solid #e8e8e8" : "none",
            }}
          >
            <Link to="/admin/products">📦 Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/menu"
            style={{
              ...(selectedKey === "/admin/menu"
                ? {
                    background: "#2c3e50",
                    color: "white",
                    fontWeight: "600",
                  }
                : {
                    color: "#2c3e50",
                    fontWeight: "500",
                  }),
              margin: "4px 8px",
              borderRadius: "6px",
              border: selectedKey !== "/admin/menu" ? "1px solid #e8e8e8" : "none",
            }}
          >
            <Link to="/admin/menu">📋 Quản lý menu</Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/orders"
            style={{
              ...(selectedKey === "/admin/orders"
                ? {
                    background: "#2c3e50",
                    color: "white",
                    fontWeight: "600",
                  }
                : {
                    color: "#2c3e50",
                    fontWeight: "500",
                  }),
              margin: "4px 8px",
              borderRadius: "6px",
              border: selectedKey !== "/admin/orders" ? "1px solid #e8e8e8" : "none",
            }}
          >
            <Link to="/admin/orders">🛒 Quản lý đơn hàng</Link>
          </Menu.Item>

          {role === "admin" && (
            <Menu.Item
              key="/admin/users"
              style={{
                ...(selectedKey === "/admin/users"
                  ? {
                      background: "#2c3e50",
                      color: "white",
                      fontWeight: "600",
                    }
                  : {
                      color: "#2c3e50",
                      fontWeight: "500",
                    }),
                margin: "4px 8px",
                borderRadius: "6px",
                border: selectedKey !== "/admin/users" ? "1px solid #e8e8e8" : "none",
              }}
            >
              <Link to="/admin/users">👥 Quản lý người dùng</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderBottom: "1px solid #e8e8e8",
          }}
        >
          <div
            style={{
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {/* <img src={logo || "/placeholder.svg"} alt="logo" style={{ height: "40px" }} /> */}
            </a>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontFamily: "Arial, sans-serif",
                  margin: 0,
                  color: "#2c3e50",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                🏢 Quản Trị Văn Phòng Phẩm
              </h1>
            </div>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
              <Button
                type="text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                  border: "1px solid #e8e8e8",
                  background: "#f8f9fa",
                }}
              >
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{
                    background: "#2c3e50",
                    marginRight: "8px",
                  }}
                />
                <span
                  style={{
                    color: "#2c3e50",
                    fontWeight: "500",
                  }}
                >
                  Admin
                </span>
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px",
            padding: "24px",
            minHeight: 280,
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#f8f9fa",
            color: "#2c3e50",
            fontWeight: "500",
            borderTop: "1px solid #e8e8e8",
          }}
        >
          📋 Hệ Thống Quản Lý Văn Phòng Phẩm ©2024
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminPage
