import { useEffect, useState } from "react"
import { unwrapResult } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Card, Typography, Breadcrumb, Divider, notification } from "antd"

import { HomeOutlined, UserOutlined, RightOutlined } from "@ant-design/icons"

import userApi from "../../api/userApi"
import { logout, update } from "../Auth/userSlice"
import AccountMenu from "./components/AccountMenu"

const { Title, Text } = Typography

function AccountInfo() {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    birthday: "",
    gender: "",
    password: "",
    profileImage: "",
    contactPhone: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const location = useLocation()

  // Fetch user information
  useEffect(() => {
    if (!userId) {
      setError("No user ID found in local storage")
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const userData = await userApi.getInfo(userId)
        setFormData(userData)
      } catch (error) {
        setError("Failed to fetch account info")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const handleLogout = () => {
    const action = logout()
    dispatch(action)
    navigate("/")
  }

  const handleUpdateUser = async (values, { setSubmitting }) => {
    try {
      const action = update({ id: userId, ...values })
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      notification.success({
        message: "Thành công",
        description: "Cập nhật thông tin thành công!",
      })
    } catch (error) {
      notification.success({
        message: "Thành công",
        description: "Cập nhật thông tin thành công!",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Determine which section is active for breadcrumbs
  const isAdditional = location.pathname.includes("/additional")
  const activeSectionName = isAdditional ? "Thông tin vận chuyển" : "Thông tin cá nhân"

  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <span className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors">
          <HomeOutlined className="text-sm" />
          Trang chủ
        </span>
      ),
    },
    {
      href: "/account",
      title: (
        <span className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors">
          <UserOutlined className="text-sm" />
          Tài khoản
        </span>
      ),
    },
    {
      title: <span className="flex items-center gap-1 text-slate-800 font-medium">{activeSectionName}</span>,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb
            separator={<RightOutlined className="text-xs text-slate-400" />}
            items={breadcrumbItems}
            className="mb-4"
          />
        </div>

        <Card className="shadow-sm border-0 bg-white rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="px-6 py-4">
              <AccountMenu />
            </div>
          </div>

          <Divider className="m-0" />

          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AccountInfo
