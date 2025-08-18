"use client"

import { useEffect, useState } from "react"
import { List, Card, Spin, Alert, Modal, Row, Col, Button, Typography } from "antd"
import { format as formatDate } from "date-fns"
import { vi } from "date-fns/locale"
import orderApi from "../../../api/ordersApi"
import { formatPrice } from "../../../utils"
import "../../../styles/order-styles.css"

const { Text, Title } = Typography

const OrderHistory = () => {
  const userId = localStorage.getItem("userId")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  console.log("selectedOrder", selectedOrder)

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const orderData = await orderApi.getOrderHistory(userId)
        const sortedOrders = orderData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        setOrders(sortedOrders)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderHistory()
  }, [userId])

  const showModal = (order) => {
    setSelectedOrder(order)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  const renderPaymentMethod = (method) => {
    switch (method) {
      case "payment":
        return "Thanh toán trực tuyến"
      case "cash":
        return "Thanh toán khi nhận hàng"
      default:
        return "Phương thức không xác định"
    }
  }

  const renderPaymentStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán"
      case "Success":
        return "Đã thanh toán"
      default:
        return status
    }
  }

  const renderShippingStatus = (status) => {
    switch (status) {
      case "not shipped":
        return "Chưa vận chuyển"
      case "processing":
        return "Đang xử lý"
      case "in transit":
        return "Đang vận chuyển"
      case "out for delivery":
        return "Đang giao hàng"
      case "delivered":
        return "Đã giao hàng"
      case "returned":
        return "Đã trả lại"
      case "canceled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chưa hoàn tất"
      case "success":
        return "Hoàn tất"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Spin tip="Đang tải lịch sử đặt hàng..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    )
  }

  return (
    <div className="order-history-page">
      <div className="order-history-container">
        <div className="page-header">
          <Title level={1} className="page-title">
            Lịch sử đặt hàng
          </Title>
          <Text className="page-subtitle">Theo dõi và quản lý các đơn hàng văn phòng phẩm của bạn</Text>
        </div>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <Card className="history-card" bodyStyle={{ padding: "24px" }}>
                <Row justify="space-between" align="middle" className="card-header">
                  <Col>
                    <Title level={4} className="order-title">
                      Mã đơn hàng: {order._id}
                    </Title>
                  </Col>
                  <Col>
                    <Button type="link" onClick={() => showModal(order)} className="detail-btn">
                      Xem chi tiết →
                    </Button>
                  </Col>
                </Row>
                <div className="order-info">
                  <Text className="info-item">
                    <span className="info-label">Ngày đặt hàng:</span>{" "}
                    {formatDate(new Date(order.orderDate), "dd/MM/yyyy HH:mm", { locale: vi })}
                  </Text>
                  <Text className="info-item">
                    <span className="info-label">Trạng thái vận chuyển:</span>
                    <span className="status-badge status-shipping">{renderShippingStatus(order.shippingStatus)}</span>
                  </Text>
                  <Text className="info-item">
                    <span className="info-label">Tổng giá trị:</span>
                    <span className="total-price">{formatPrice(order.totalAmount)}</span>
                  </Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
        {selectedOrder && (
          <Modal
            title={`Chi tiết đơn hàng ${selectedOrder._id}`}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            className="office-modal"
          >
            <Card className="modal-card" bodyStyle={{ padding: "24px" }}>
              <div className="modal-content">
                <Text className="info-item">
                  <span className="info-label">Ngày đặt hàng:</span>{" "}
                  {formatDate(new Date(selectedOrder.orderDate), "dd/MM/yyyy HH:mm", { locale: vi })}
                </Text>
                <Text className="info-item">
                  <span className="info-label">Trạng thái:</span>
                  <span className="status-badge status-success">{renderStatus(selectedOrder.status)}</span>
                </Text>
                <div className="shipping-section">
                  <Text className="info-item">
                    <span className="info-label">Trạng thái vận chuyển:</span>
                    <span className="status-badge status-shipping">
                      {renderShippingStatus(selectedOrder.shippingStatus)}
                    </span>
                  </Text>
                  <a href="http://localhost:3000/account/additional" className="detail-link">
                    (Xem chi tiết)
                  </a>
                </div>
                <Text className="info-item">
                  <span className="info-label">Tổng giá trị:</span>
                  <span className="total-price">{formatPrice(selectedOrder.totalAmount)}</span>
                </Text>
                <Text className="info-item">
                  <span className="info-label">Danh sách sản phẩm:</span>
                </Text>
                <ul className="product-list">
                  {selectedOrder.products.map((item) => (
                    <li key={item.productId} className="product-item">
                      <img src={item.urlImage || "/placeholder.svg"} alt="Product" className="product-thumb" />
                      <div className="product-details">
                        <Text className="product-quantity">Số lượng: {item.quantity}</Text>
                        <Text className="product-price-text">Giá sản phẩm: {formatPrice(item.price)}</Text>
                      </div>
                    </li>
                  ))}
                </ul>
                <Text className="info-item">
                  <span className="info-label">Thông tin vận chuyển:</span>
                </Text>
                <div className="shipping-info-modal">
                  <Text className="shipping-detail">Người nhận: {selectedOrder.shippingInfo.receiver}</Text>
                  <Text className="shipping-detail">Điện thoại: {selectedOrder.shippingInfo.phone}</Text>
                  <Text className="shipping-detail">
                    Địa chỉ: {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.addressDetail}
                  </Text>
                </div>
              </div>
            </Card>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
