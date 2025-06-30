"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, Row, Col, Typography, Space, Spin, Alert, Empty, Badge } from "antd"
import {
  AppstoreOutlined,
  TagsOutlined,
  FilterOutlined,
  ShoppingOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import TypeItem from "./components/TypeItem"
import menuApi from "../../../../api/menuApi"
import "./product-type-style.css"

const { Title, Text } = Typography

function ProductType({ onChange, filters = {}, showHeader = true, layout = "grid", compact = false }) {
  const [typeList, setTypeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTypes, setSelectedTypes] = useState([])

  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await menuApi.getType()

        // Filter for office supplies category
        const filteredTypeList = data.filter((item) => item.categoryId === "66968d748675a1be4a653de2")

        setTypeList(filteredTypeList)
      } catch (error) {
        console.error("Failed to fetch type data:", error)
        setError("Không thể tải danh sách loại sản phẩm")
      } finally {
        setLoading(false)
      }
    }

    fetchTypeData()
  }, [])

  const handleTypeChange = (typeData) => {
    if (onChange) {
      onChange(typeData)
    }
  }

  const handleTypeSelect = (typeId, selected) => {
    if (selected) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
  }

  // Loading state
  if (loading) {
    return (
      <Card className="product-type-card loading-card">
        <div className="loading-container">
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 24, color: "#1e3a8a" }} spin />} />
          <Text className="loading-text">Đang tải loại sản phẩm...</Text>
        </div>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card className="product-type-card error-card">
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          icon={<ExclamationCircleOutlined />}
          showIcon
          className="error-alert"
        />
      </Card>
    )
  }

  // Empty state
  if (typeList.length === 0) {
    return (
      <Card className="product-type-card empty-card">
        <Empty
          image={<AppstoreOutlined className="empty-icon" />}
          description={
            <div className="empty-description">
              <Text>Không có loại sản phẩm nào</Text>
              <br />
              <Text type="secondary">Vui lòng thử lại sau</Text>
            </div>
          }
        />
      </Card>
    )
  }

  return (
    <div className={`product-type-container ${compact ? "compact" : ""}`}>
      <Card className="product-type-card">
        {showHeader && (
          <div className="type-header">
            <div className="header-content">
              <div className="header-title">
                <TagsOutlined className="header-icon" />
                <Title level={4} className="header-text">
                  Loại sản phẩm
                </Title>
                {selectedTypes.length > 0 && <Badge count={selectedTypes.length} className="selection-badge" />}
              </div>
              <Text className="header-subtitle">Chọn loại sản phẩm phù hợp với nhu cầu của bạn</Text>
            </div>

            <div className="header-stats">
              <Space size="large">
                <div className="stat-item">
                  <AppstoreOutlined className="stat-icon" />
                  <div className="stat-content">
                    <Text strong className="stat-number">
                      {typeList.length}
                    </Text>
                    <Text className="stat-label">Loại</Text>
                  </div>
                </div>
                <div className="stat-item">
                  <FilterOutlined className="stat-icon" />
                  <div className="stat-content">
                    <Text strong className="stat-number">
                      {selectedTypes.length}
                    </Text>
                    <Text className="stat-label">Đã chọn</Text>
                  </div>
                </div>
              </Space>
            </div>
          </div>
        )}

        <div className={`type-content ${layout}`}>
          {layout === "grid" ? (
            <Row gutter={[16, 16]} className="type-grid">
              {typeList.map((type) => (
                <Col
                  key={type._id}
                  xs={compact ? 12 : 24}
                  sm={compact ? 8 : 12}
                  md={compact ? 6 : 8}
                  lg={compact ? 4 : 6}
                  xl={compact ? 4 : 6}
                  className="type-col"
                >
                  <div className="type-item-wrapper">
                    <TypeItem
                      data={type}
                      onChange={handleTypeChange}
                      onSelect={handleTypeSelect}
                      selected={selectedTypes.includes(type._id)}
                      compact={compact}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="type-list">
              {typeList.map((type, index) => (
                <div key={type._id} className="type-list-item">
                  <TypeItem
                    data={type}
                    onChange={handleTypeChange}
                    onSelect={handleTypeSelect}
                    selected={selectedTypes.includes(type._id)}
                    layout="horizontal"
                    showIndex={index + 1}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Footer */}
        {typeList.length > 0 && (
          <div className="type-footer">
            <div className="footer-content">
              <div className="footer-info">
                <ShoppingOutlined className="footer-icon" />
                <Text className="footer-text">
                  Tổng cộng <span className="highlight">{typeList.length}</span> loại sản phẩm văn phòng phẩm
                </Text>
              </div>
              {selectedTypes.length > 0 && (
                <div className="footer-selection">
                  <Text className="selection-text">
                    Đã chọn <span className="highlight">{selectedTypes.length}</span> loại
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

ProductType.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
  showHeader: PropTypes.bool,
  layout: PropTypes.oneOf(["grid", "list"]),
  compact: PropTypes.bool,
}

export default ProductType
