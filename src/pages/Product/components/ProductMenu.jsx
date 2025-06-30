"use client"

import { Menu } from "antd"
import { NavLink, useMatch, useLocation } from "react-router-dom"
import { FileTextOutlined, SettingOutlined, StarOutlined, InfoCircleOutlined } from "@ant-design/icons"
import "./product-menu-style.css"

function ProductMenu() {
  const match = useMatch("/products/:productId/*")
  const location = useLocation()
  const basePath = match ? match.pathnameBase : ""

  // Determine current active key based on pathname
  const getActiveKey = () => {
    const pathname = location.pathname
    if (pathname.endsWith("/additional")) return "additional"
    if (pathname.endsWith("/reviews")) return "reviews"
    return "description"
  }

  const menuItems = [
    {
      key: "description",
      icon: <FileTextOutlined />,
      label: (
        <NavLink to={basePath} end className="menu-link">
          Mô tả sản phẩm
        </NavLink>
      ),
    },
    {
      key: "additional",
      icon: <SettingOutlined />,
      label: (
        <NavLink to={`${basePath}/additional`} end className="menu-link">
          Thông số kỹ thuật
        </NavLink>
      ),
    },
    {
      key: "reviews",
      icon: <StarOutlined />,
      label: (
        <NavLink to={`${basePath}/reviews`} end className="menu-link">
          Đánh giá sản phẩm
        </NavLink>
      ),
    },
  ]

  return (
    <div className="product-menu-container">
      <div className="menu-header">
        <div className="menu-title">
          <InfoCircleOutlined />
          <span>Thông tin chi tiết</span>
        </div>
        <div className="menu-subtitle">Chọn mục để xem thông tin chi tiết về sản phẩm</div>
      </div>

      <Menu mode="horizontal" selectedKeys={[getActiveKey()]} items={menuItems} className="product-menu" />
    </div>
  )
}

export default ProductMenu
