import { useState, useEffect } from "react"
import { Menu } from "antd"
import { NavLink, useMatch } from "react-router-dom"
import { UserOutlined, CarOutlined } from "@ant-design/icons"

function AccountMenu() {
  const match = useMatch("/account/*")
  const basePath = match ? match.pathnameBase : ""
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isMobile = windowWidth < 768

  const menuItems = [
    {
      key: "personal",
      icon: <UserOutlined />,
      label: (
        <NavLink to={basePath} end className="font-semibold">
          THÔNG TIN CÁ NHÂN
        </NavLink>
      ),
    },
    {
      key: "shipping",
      icon: <CarOutlined />,
      label: (
        <NavLink to={`${basePath}/additional`} end className="font-semibold">
          THÔNG TIN VẬN CHUYỂN
        </NavLink>
      ),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 mb-6">
      <Menu
        mode={isMobile ? "vertical" : "horizontal"}
        items={menuItems}
        className="bg-white rounded-xl shadow-lg border-0 overflow-hidden"
        style={{
          borderBottom: "none",
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}
        theme="light"
      />
    </div>
  )
}

export default AccountMenu
