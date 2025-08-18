"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Button, Input, Typography, Avatar, Divider, Spin, Form, message, Row, Col } from "antd"
import {
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  LogoutOutlined,
  SaveOutlined,
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import userApi from "../../../api/userApi"
import { logout, update } from "../../Auth/userSlice"

const { Title, Text } = Typography

function Account() {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    displayName: "",
    address: "",
    addressDetail: "",
    contactPhone: "",
    profileImage: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!userId) {
      setError("Không tìm thấy ID người dùng")
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const userData = await userApi.getInfo(userId)
        setFormData(userData)
        form.setFieldsValue(userData)
      } catch (error) {
        setError("Không thể tải thông tin tài khoản")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId, form])

  const handleLogout = () => {
    const action = logout()
    dispatch(action)
    message.info("Đăng xuất thành công")
    navigate("/")
  }

  const handleUpdateUser = async (values) => {
    setSubmitting(true)
    try {
      const action = update({ id: userId, ...values })
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      message.success("Cập nhật thông tin thành công!")
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra khi cập nhật thông tin!")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-lg">
            <div className="flex justify-center items-center h-96">
              <Spin size="large" />
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <div className="mb-4 flex justify-center">
              {formData.avaUrl ? (
                <Avatar
                  src={formData.avaUrl}
                  size={120}
                  className="border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              ) : (
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="bg-blue-500 border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              )}
            </div>
            <Title level={2} className="text-white mb-2 font-bold">
              Thông tin tài khoản
            </Title>
            {formData.email && <Text className="text-blue-100 text-lg">{formData.email}</Text>}
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <Form form={form} layout="vertical" onFinish={handleUpdateUser} className="space-y-6">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="displayName"
                    label={
                      <span className="flex items-center text-gray-700 font-semibold">
                        <UserOutlined className="mr-2 text-blue-600" />
                        Tên hiển thị
                      </span>
                    }
                    rules={[{ required: true, message: "Tên hiển thị là bắt buộc" }]}
                  >
                    <Input
                      size="large"
                      className="rounded-lg border-gray-300 focus:border-blue-500"
                      placeholder="Nhập tên hiển thị"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="contactPhone"
                    label={
                      <span className="flex items-center text-gray-700 font-semibold">
                        <PhoneOutlined className="mr-2 text-blue-600" />
                        Số điện thoại
                      </span>
                    }
                    rules={[
                      { required: true, message: "Số điện thoại là bắt buộc" },
                      { pattern: /^[0-9]+$/, message: "Số điện thoại chỉ được chứa số" },
                      { min: 10, message: "Số điện thoại phải có ít nhất 10 số" },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded-lg border-gray-300 focus:border-blue-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="address"
                    label={
                      <span className="flex items-center text-gray-700 font-semibold">
                        <HomeOutlined className="mr-2 text-blue-600" />
                        Địa chỉ (Phường/Quận/Thành Phố)
                      </span>
                    }
                    rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}
                  >
                    <Input
                      size="large"
                      className="rounded-lg border-gray-300 focus:border-blue-500"
                      placeholder="Nhập địa chỉ"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="addressDetail"
                    label={
                      <span className="flex items-center text-gray-700 font-semibold">
                        <EnvironmentOutlined className="mr-2 text-blue-600" />
                        Số nhà, tên đường
                      </span>
                    }
                  >
                    <Input
                      size="large"
                      className="rounded-lg border-gray-300 focus:border-blue-500"
                      placeholder="Nhập số nhà, tên đường"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="my-8" />

              <div className="flex justify-center gap-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  loading={submitting}
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg px-8 py-2 h-auto font-semibold"
                >
                  {submitting ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
                <Button
                  size="large"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  className="border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 rounded-lg px-8 py-2 h-auto font-semibold"
                >
                  Đăng xuất
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Account
