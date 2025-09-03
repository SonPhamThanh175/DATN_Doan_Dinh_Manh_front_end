"use client"

import { useEffect, useState } from "react"
import { Table, Tag, Space, Modal, Select, Button, Tooltip } from "antd"
import axios from "axios"

const { Option } = Select

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newShippingStatus, setNewShippingStatus] = useState("")
  const accessToken = localStorage.getItem("access_token")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        setOrders(sortedOrders)
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error)
      })
  }

  const handleOpenModal = (order) => {
    setSelectedOrder(order)
    setNewShippingStatus(order.shippingStatus) // Gán trạng thái hiện tại
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (selectedOrder) {
      axios
        .put(
          `http://localhost:5000/api/orders/${selectedOrder._id}/shipping-status`,
          {
            shippingStatus: newShippingStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response) => {
          fetchOrders()
          setIsModalVisible(false)
          setSelectedOrder(null)
          setNewShippingStatus("")
        })
        .catch((error) => {
          console.error("There was an error updating the shipping status!", error.message)
          console.error("Error details:", error.config)
        })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedOrder(null)
    setNewShippingStatus("")
  }

  const columns = [
    {
      title: "Người nhận",
      dataIndex: ["shippingInfo", "receiver"],
      key: "receiver",
      fixed: "left",
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "SĐT",
      dataIndex: ["shippingInfo", "phone"],
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: ["shippingInfo", "address"],
      key: "address",
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `${text} VND`,
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "geekblue"
        if (status === "pending") {
          color = "volcano"
        } else if (status === "success") {
          color = "green"
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    // {
    //   title: 'Phương thức thanh toán',
    //   dataIndex: 'paymentStatus',
    //   key: 'paymentStatus',
    //   render: (status) => {
    //     let color = status === 'success' ? 'green' : 'volcano';
    //     let label = status === 'success' ? 'Chuyển khoản' : 'Tiền mặt';
    //     return (
    //       <Tag color={color} key={status}>
    //         {label}
    //       </Tag>
    //     );
    //   },
    // },

    {
      title: "Trạng thái vận chuyển",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (status) => {
        let color = "blue"
        let label = ""

        switch (status) {
          case "pending":
            color = "orange"
            label = "Chờ xử lý"
            break
          case "shipping":
            color = "blue"
            label = "Đang vận chuyển"
            break
          case "delivered":
            color = "green"
            label = "Đã giao"
            break
          case "cancelled":
            color = "red"
            label = "Đã hủy"
            break
          default:
            label = status
        }

        return (
          <Tag color={color} key={status}>
            {label}
          </Tag>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => {
        // Check if status is success
        const isSuccess = record.status === "success"

        return (
          <Space size="middle">
            {isSuccess ? (
              <Tooltip title="Không thể cập nhật đơn hàng đã hoàn thành">
                <Button type="text" disabled style={{ color: "#d9d9d9", cursor: "not-allowed" }}>
                  Cập nhật
                </Button>
              </Tooltip>
            ) : (
              <Button type="link" onClick={() => handleOpenModal(record)} style={{ padding: 0 }}>
                Cập nhật
              </Button>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey="_id" scroll={{ x: 1300 }} />
      <Modal title="Cập nhật trạng thái giao hàng" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Select value={newShippingStatus} style={{ width: "100%" }} onChange={setNewShippingStatus}>
          <Option value="pending">Chờ xử lý</Option>
          <Option value="shipping">Đang vận chuyển</Option>
          <Option value="delivered">Đã giao</Option>
          <Option value="cancelled">Đã hủy</Option>
        </Select>
      </Modal>
    </>
  )
}

export default OrderManagement
