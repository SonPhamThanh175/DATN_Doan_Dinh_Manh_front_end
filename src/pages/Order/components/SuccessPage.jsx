"use client"

import { useEffect } from "react"
import { Button, Result } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import "../../../styles/order-styles.css"

function SuccessPage(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId } = location.state || {} // Lấy orderId từ state

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="success-page">
      <Result
        status="success"
        title={<span className="success-title">Đặt hàng thành công!</span>}
        subTitle={
          <span className="success-subtitle">
            Mã đơn hàng: <span className="order-id">{orderId || "N/A"}</span>
          </span>
        }
        extra={[
          <Button
            onClick={() => {
              navigate("/order-history")
            }}
            type="default"
            key="orders"
            className="success-btn-secondary"
          >
            Xem đơn hàng
          </Button>,
          <Button
            onClick={() => {
              navigate("/products")
            }}
            type="primary"
            key="continue"
            className="success-btn-primary"
          >
            Tiếp tục mua sắm
          </Button>,
        ]}
        className="office-success-result"
      />
    </div>
  )
}

SuccessPage.propTypes = {}

export default SuccessPage
