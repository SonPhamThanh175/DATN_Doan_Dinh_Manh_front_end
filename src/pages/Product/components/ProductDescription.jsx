"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import DOMPurify from "dompurify"
import { useParams } from "react-router-dom"
import { Card, Typography, Spin, Alert, Divider, Space, Empty } from "antd"
import {
  FileTextOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  SafetyOutlined,
  TruckOutlined,
} from "@ant-design/icons"
import productsApi from "../../../api/productApi"
import "./product-description-style.css"

const { Title, Text, Paragraph } = Typography

ProductDescription.propTypes = {
  product: PropTypes.object,
}

function ProductDescription({ product }) {
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
        console.error("Error fetching product description:", error)
        setError("Không thể tải mô tả sản phẩm")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductData()
    }
  }, [id])

  // Sanitize HTML content
  const safeDescription = data?.descriptionFull ? DOMPurify.sanitize(data.descriptionFull) : ""

  // Features for office supplies
  const productFeatures = [
    {
      icon: <CheckCircleOutlined />,
      title: "Chất lượng cao",
      description: "Sản phẩm được kiểm tra chất lượng nghiêm ngặt",
    },
    {
      icon: <SafetyOutlined />,
      title: "An toàn sử dụng",
      description: "Đảm bảo an toàn cho người sử dụng",
    },
    {
      icon: <TruckOutlined />,
      title: "Giao hàng nhanh",
      description: "Giao hàng trong 24h tại Hà Nội",
    },
    {
      icon: <StarOutlined />,
      title: "Bảo hành chính hãng",
      description: "Bảo hành theo chính sách nhà sản xuất",
    },
  ]

  if (loading) {
    return (
      <Card className="product-description-card">
        <div className="loading-container">
          <Spin size="large" />
          <Text>Đang tải mô tả sản phẩm...</Text>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="product-description-card">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    )
  }

  return (
    <Card className="product-description-card">
      <div className="card-header">
        <Title level={4} className="card-title">
          <FileTextOutlined /> Mô tả chi tiết sản phẩm
        </Title>
        <Text className="card-subtitle">Thông tin đầy đủ về sản phẩm và cách sử dụng</Text>
      </div>

      <div className="description-content">
        {safeDescription ? (
          <div className="description-html" dangerouslySetInnerHTML={{ __html: safeDescription }} />
        ) : data.description ? (
          <div className="description-text">
            <Paragraph className="description-paragraph">{data.description}</Paragraph>
          </div>
        ) : (
          <Empty
            image={<FileTextOutlined className="empty-icon" />}
            description={
              <div className="empty-description">
                <Text>Mô tả chi tiết đang được cập nhật</Text>
                <br />
                <Text type="secondary">Vui lòng liên hệ để biết thêm thông tin chi tiết</Text>
              </div>
            }
          />
        )}
      </div>

      {(safeDescription || data.description) && (
        <>
          <Divider />
          <div className="product-features">
            <Title level={5} className="features-title">
              <InfoCircleOutlined /> Ưu điểm nổi bật
            </Title>
            <div className="features-grid">
              {productFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <Text strong className="feature-title">
                      {feature.title}
                    </Text>
                    <Text className="feature-description">{feature.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Divider />

      <div className="additional-info">
        <Alert
          message="Thông tin quan trọng"
          description={
            <Space direction="vertical" size="small">
              <Text>• Sản phẩm được bảo hành chính hãng theo quy định của nhà sản xuất</Text>
              <Text>• Vui lòng kiểm tra kỹ sản phẩm khi nhận hàng</Text>
              <Text>• Liên hệ hotline để được hỗ trợ tư vấn chi tiết</Text>
            </Space>
          }
          type="info"
          showIcon
          className="info-alert"
        />
      </div>
    </Card>
  )
}

export default ProductDescription
