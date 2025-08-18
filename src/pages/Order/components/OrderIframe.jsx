import { Modal } from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../../../styles/order-styles.css"


const OrderIframe = ({ isVisible, handleClose, url, orderId }) => {
  console.log(url)

  const navigate = useNavigate()
  const checkOrderStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`)
      console.log("response sau khi thanh toan ", response)

      const status = response.data.paymentStatus

      if (status === "Success") {
        // Chuyển trang
        navigate("/success-page", { state: { orderId } })
      } else if (status === "pending") {
        // Ở lại trang
        // Set order status hoặc làm hành động khác nếu cần
      }
    } catch (error) {
      console.error("Error fetching order status:", error)
    }
  }

  const handleCancel = () => {
    handleClose()
    checkOrderStatus()
  }

  return (
    <Modal
      open={isVisible}
      footer={null}
      onCancel={handleCancel}
      width="80%"
      title={<span className="modal-title">Thanh toán</span>}
      className="office-modal"
      styles={{
        header: {
          backgroundColor: "#f8fafc",
          borderBottom: "2px solid #e2e8f0",
        },
      }}
    >
      <div className="iframe-container">
        <iframe src={url} title="Payment Content" className="payment-iframe" allow="payment" />
      </div>
    </Modal>
  )
}

export default OrderIframe
