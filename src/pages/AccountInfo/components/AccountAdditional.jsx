import { useEffect, useState } from "react"
import { Card, Typography, Divider, Tag, Row, Col, Skeleton, Timeline, Empty } from "antd"
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CarryOutOutlined,
  CloseCircleOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import orderApi from "../../../api/ordersApi"

const { Title, Text } = Typography

function AccountAdditional() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrderHistory(userId)
        console.log("response:", response)

        const sortedOrders = (response || []).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        setOrders(sortedOrders)
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchOrders()
    }
  }, [userId])

  const getTimelineItems = (shippingStatus) => {
    const steps = [
      {
        status: "pending",
        label: "Chờ xử lý",
        color: "#ff9800",
        icon: <ClockCircleOutlined />,
      },
      {
        status: "shipping",
        label: "Đang vận chuyển",
        color: "#2196f3",
        icon: <CarryOutOutlined />,
      },
      {
        status: "delivered",
        label: "Đã giao",
        color: "#4caf50",
        icon: <CheckCircleOutlined />,
      },
      {
        status: "cancelled",
        label: "Đã hủy",
        color: "#f44336",
        icon: <CloseCircleOutlined />,
      },
    ]

    const index = steps.findIndex((step) => step.status === shippingStatus)
    const activeSteps = steps.slice(0, index + 1)

    return activeSteps.map((step, idx) => ({
      color: step.color,
      dot: step.icon,
      children: (
        <Text
          strong={idx === activeSteps.length - 1}
          style={{
            color: idx === activeSteps.length - 1 ? step.color : "inherit",
          }}
        >
          {step.label}
        </Text>
      ),
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange"
      case "shipping":
        return "blue"
      case "delivered":
        return "green"
      case "cancelled":
        return "red"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý"
      case "shipping":
        return "Đang vận chuyển"
      case "delivered":
        return "Đã giao"
      case "cancelled":
        return "Đã hủy"
      default:
        return "Không xác định"
    }
  }

  const getPaymentStatusLabel = (status) => {
    return status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"
  }

  const getPaymentStatusColor = (status) => {
    return status === "paid" ? "green" : "orange"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Title level={3} className="mb-6 text-gray-800">
            Lịch sử đơn hàng
          </Title>
          {[1, 2].map((item) => (
            <Card key={item} className="mb-6 shadow-lg rounded-xl" loading={true}>
              <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="shadow-lg rounded-xl">
            <Empty
              image={<ShoppingOutlined style={{ fontSize: 64, color: "#9e9e9e" }} />}
              description={
                <div className="text-center">
                  <Title level={4} className="text-gray-600 mb-2">
                    Chưa có đơn hàng nào
                  </Title>
                  <Text className="text-gray-500">Các đơn hàng của bạn sẽ xuất hiện ở đây sau khi bạn mua sắm</Text>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Title level={3} className="mb-6 text-gray-800">
          Lịch sử đơn hàng
        </Title>

        {orders.map((order, index) => (
          <Card
            key={order._id}
            className="mb-6 shadow-lg rounded-xl border-0 hover:shadow-xl transition-all duration-300"
            style={{
              borderLeft: `4px solid ${
                order.shippingStatus === "pending"
                  ? "#ff9800"
                  : order.shippingStatus === "shipping"
                    ? "#2196f3"
                    : order.shippingStatus === "delivered"
                      ? "#4caf50"
                      : "#f44336"
              }`,
            }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={14}>
                <div className="mb-4">
                  <Title level={4} className="mb-3 text-gray-800">
                    Đơn hàng #{order._id.substring(order._id.length - 8)}
                  </Title>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag color={getStatusColor(order.shippingStatus)} className="px-3 py-1 rounded-full font-semibold">
                      {getStatusLabel(order.shippingStatus)}
                    </Tag>
                    <Tag
                      color={getPaymentStatusColor(order.paymentStatus)}
                      className="px-3 py-1 rounded-full font-semibold"
                    >
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </Tag>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Timeline items={getTimelineItems(order.shippingStatus)} className="mt-2" />
                </div>
              </Col>

              <Col xs={24} lg={10}>
                <Card
                  size="small"
                  className="h-full bg-blue-50 border-blue-200"
                  title={<span className="text-blue-800 font-semibold">Chi tiết đơn hàng</span>}
                >
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarOutlined className="mr-3 text-blue-600" />
                      <div>
                        <Text strong className="text-gray-700">
                          Ngày đặt:
                        </Text>
                        <br />
                        <Text className="text-gray-600">
                          {order?.orderDate ? new Date(order.orderDate).toLocaleDateString("vi-VN") : "Không xác định"}
                        </Text>
                      </div>
                    </div>

                    <Divider className="my-3" />

                    <div className="flex items-center">
                      <DollarOutlined className="mr-3 text-green-600" />
                      <div>
                        <Text strong className="text-gray-700">
                          Tổng tiền:
                        </Text>
                        <br />
                        <Title level={4} className="text-red-600 mb-0">
                          {order.totalAmount?.toLocaleString()}₫
                        </Title>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AccountAdditional
