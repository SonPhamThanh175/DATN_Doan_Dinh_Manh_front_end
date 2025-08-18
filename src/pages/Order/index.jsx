"use client"

import { useEffect, useState } from "react"
import { Radio, Modal, Typography, message } from "antd"
import { BankOutlined, TruckOutlined } from "@ant-design/icons"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useLocation, useNavigate } from "react-router-dom"
import orderApi from "../../api/ordersApi"
import { formatPrice } from "../../utils/common"
import OrderIframe from "./components/OrderIframe"
import UpdateShippingInfo from "./components/UpdateShippingInfo"
import "../../styles/order-styles.css"

const { Title, Text } = Typography

const OrderPage = () => {
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderId = queryParams.get("id")
  const [itemsList, setItemsList] = useState([])
  const [paymentUrl, setPaymentUrl] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  const totalAmount = itemsList.reduce((total, item) => {
    return total + item.quantity * item.price
  }, 0)

  const [shippingInfo, setShippingInfo] = useState({
    receiver: " ",
    phone: " ",
    address: " ",
    addressDetail: " ",
  })

  const validationSchema = Yup.object().shape({
    paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  })

  const handleBuyNow = async (values) => {
    const { paymentMethod } = values
    if (paymentMethod === "cash") {
      message.success("Đặt hàng thành công!")
      navigate("/success-page")
      return
    }
    try {
      const res = await orderApi.payment(orderId, paymentMethod)
      const paymentUrl = res.paymentUrl.paymentInf.order_url
      setPaymentUrl(paymentUrl)
      setIsIframeVisible(true)
    } catch (error) {
      console.error("Error fetching order:", error)
      message.error("Có lỗi xảy ra khi xử lý thanh toán!")
    }
  }

  const handleCloseIframe = () => {
    setIsIframeVisible(false)
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.get(orderId)
        const itemsList = res.products
        const shippingInfo = res.shippingInfo
        setShippingInfo(shippingInfo)
        setItemsList(itemsList)
      } catch (error) {
        console.error("Error fetching order:", error)
        message.error("Có lỗi xảy ra khi tải thông tin đơn hàng!")
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  return (
    <div className="order-page">
      <div className="order-container">
        {/* Shipping Address Section */}
        <div className="order-card">
          <div className="card-content">
            <div className="shipping-header">
              <h3 className="section-title">Địa chỉ nhận hàng</h3>
              <button onClick={handleOpenDialog} className="change-address-btn">
                Thay đổi địa chỉ
              </button>
            </div>
            <div className="shipping-info">
              <div className="shipping-details">
                <span className="receiver-name">{shippingInfo.receiver}</span>
                <span>({shippingInfo.phone})</span>
                <span>
                  {shippingInfo.addressDetail}, {shippingInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="order-card">
          <div className="card-content">
            <h3 className="section-title">Thông tin sản phẩm</h3>

            {/* Product Table */}
            <div className="product-table">
              <div className="table-header">
                <div>Sản phẩm</div>
                <div>Giá</div>
                <div>Số lượng</div>
                <div>Thành tiền</div>
              </div>

              {/* Product Rows */}
              {itemsList.map((item, index) => (
                <div key={index} className="product-row">
                  <div className="product-image-container">
                    <img
                      src={item.urlImage || "/placeholder.svg?height=80&width=80&query=office supplies product"}
                      alt={item.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-price">{formatPrice(item.price)}</div>
                  <div className="product-quantity">{item.quantity}</div>
                  <div className="product-total">{formatPrice(item.quantity * item.price)}</div>
                </div>
              ))}

              <div className="total-section">
                <h2 className="total-amount">Tổng tiền: {formatPrice(totalAmount)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="order-card">
          <div className="card-content">
            <h3 className="section-title">Phương thức thanh toán</h3>
            <Formik initialValues={{ paymentMethod: "" }} validationSchema={validationSchema} onSubmit={handleBuyNow}>
              {({ values, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="payment-methods">
                    <div
                      className={`payment-option ${values.paymentMethod === "payment" ? "selected" : ""}`}
                      onClick={() => setFieldValue("paymentMethod", "payment")}
                    >
                      <Radio value="payment" checked={values.paymentMethod === "payment"}>
                        <div className="payment-content">
                          <BankOutlined className="payment-icon" />
                          <div className="payment-details">
                            <h4>Chuyển khoản ngân hàng</h4>
                            <p>
                              Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ được giao sau
                              khi tiền đã chuyển.
                            </p>
                          </div>
                        </div>
                      </Radio>
                    </div>
                    <div
                      className={`payment-option ${values.paymentMethod === "cash" ? "selected" : ""}`}
                      onClick={() => setFieldValue("paymentMethod", "cash")}
                    >
                      <Radio value="cash" checked={values.paymentMethod === "cash"}>
                        <div className="payment-content">
                          <TruckOutlined className="payment-icon" />
                          <div className="payment-details">
                            <h4>Trả tiền mặt khi nhận hàng</h4>
                            <p>Trả tiền mặt khi giao hàng</p>
                          </div>
                        </div>
                      </Radio>
                    </div>
                  </div>
                  <div className="order-button-container">
                    <button type="submit" className="order-button">
                      Đặt hàng
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Order Iframe */}
        <OrderIframe isVisible={isIframeVisible} handleClose={handleCloseIframe} url={paymentUrl} orderId={orderId} />

        {/* Change Address Modal */}
        <Modal
          title={<span className="modal-title">Thay đổi địa chỉ nhận hàng</span>}
          open={isDialogOpen}
          onCancel={handleCloseDialog}
          footer={null}
          className="office-modal"
        >
          <UpdateShippingInfo
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            onClose={handleCloseDialog}
          />
        </Modal>
      </div>
    </div>
  )
}

export default OrderPage
