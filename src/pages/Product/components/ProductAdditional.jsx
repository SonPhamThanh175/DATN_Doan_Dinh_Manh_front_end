"use client"

import { useEffect, useState } from "react"
import { Card, Table, Typography, Spin, Alert, Tag, Space } from "antd"
import { useParams } from "react-router-dom"
import {
  InfoCircleOutlined,
  BgColorsOutlined,
  ExpandAltOutlined,
  AppstoreOutlined,
  TagOutlined,
  ShoppingOutlined,
} from "@ant-design/icons"
import productsApi from "../../../api/productApi"
import "./product-additional-style.css"

const { Title, Text } = Typography

function ProductAdditional(props) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const id = params.productId

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await productsApi.get(id)
        setData(response)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Không thể tải thông tin sản phẩm")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductData()
    }
  }, [id])

  const columns = [
    {
      title: (
        <Space>
          <InfoCircleOutlined />
          <Text strong>Thông số kỹ thuật</Text>
        </Space>
      ),
      dataIndex: "key",
      key: "key",
      width: "40%",
      render: (text, record) => (
        <Space>
          {record.icon}
          <Text strong className="spec-key">
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: (
        <Space>
          <TagOutlined />
          <Text strong>Chi tiết</Text>
        </Space>
      ),
      dataIndex: "value",
      key: "value",
      render: (text, record) => {
        if (record.key === "Màu sắc" && Array.isArray(text)) {
          return (
            <Space wrap>
              {text.map((color, index) => (
                <Tag key={index} color="blue" className="color-tag">
                  {color}
                </Tag>
              ))}
            </Space>
          )
        }
        if (record.key === "Kích thước" && Array.isArray(text)) {
          return (
            <Space wrap>
              {text.map((size, index) => (
                <Tag key={index} color="green" className="size-tag">
                  {size}
                </Tag>
              ))}
            </Space>
          )
        }
        return <Text className="spec-value">{text || "Không có thông tin"}</Text>
      },
    },
  ]

  // Tạo dataSource với thông tin chi tiết hơn cho văn phòng phẩm
  const dataSource = [
    {
      key: "Tên sản phẩm",
      value: data.name,
      icon: <ShoppingOutlined className="spec-icon" />,
    },
    {
      key: "Mô tả",
      value: data.description,
      icon: <InfoCircleOutlined className="spec-icon" />,
    },
    {
      key: "Kích thước",
      value: Array.isArray(data.size) ? data.size : data.size ? [data.size] : [],
      icon: <ExpandAltOutlined className="spec-icon" />,
    },
    {
      key: "Màu sắc",
      value: Array.isArray(data.Color) ? data.Color : data.Color ? [data.Color] : [],
      icon: <BgColorsOutlined className="spec-icon" />,
    },
    {
      key: "Danh mục",
      value: data.categoryId || "Văn phòng phẩm",
      icon: <AppstoreOutlined className="spec-icon" />,
    },
    {
      key: "Loại sản phẩm",
      value: data.typeId || "Sản phẩm tiêu chuẩn",
      icon: <TagOutlined className="spec-icon" />,
    },
    {
      key: "Số lượng tồn kho",
      value: data.quantity ? `${data.quantity} sản phẩm` : "Liên hệ",
      icon: <InfoCircleOutlined className="spec-icon" />,
    },
  ].filter((item) => item.value !== undefined && item.value !== null && item.value !== "")

  if (loading) {
    return (
      <Card className="product-additional-card">
        <div className="loading-container">
          <Spin size="large" />
          <Text>Đang tải thông tin sản phẩm...</Text>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="product-additional-card">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    )
  }

  return (
    <Card className="product-additional-card">
      <div className="card-header">
        <Title level={4} className="card-title">
          <InfoCircleOutlined /> Thông tin chi tiết sản phẩm
        </Title>
        <Text className="card-subtitle">Xem các thông số kỹ thuật và đặc điểm của sản phẩm</Text>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showHeader={true}
        bordered={false}
        className="product-specs-table"
        rowClassName={(record, index) => (index % 2 === 0 ? "table-row-even" : "table-row-odd")}
        locale={{
          emptyText: (
            <div className="empty-state">
              <InfoCircleOutlined className="empty-icon" />
              <Text>Chưa có thông tin chi tiết</Text>
            </div>
          ),
        }}
      />

      <div className="additional-info">
        <Alert
          message="Thông tin sản phẩm"
          description="Các thông số trên có thể thay đổi tùy theo từng phiên bản sản phẩm. Vui lòng liên hệ để được tư vấn chi tiết."
          type="info"
          showIcon
          className="info-alert"
        />
      </div>
    </Card>
  )
}

export default ProductAdditional
