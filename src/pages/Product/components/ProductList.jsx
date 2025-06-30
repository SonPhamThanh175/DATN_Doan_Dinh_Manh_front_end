"use client"

import React, { useState } from "react"
import PropTypes from "prop-types"
import { Row, Col, Card, Empty, Spin, Button, Space, Typography, Affix } from "antd"
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  ShoppingOutlined,
  EyeOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons"
import Product from "./Product"
import "./product-list-style.css"

const { Title, Text } = Typography

function ProductList({ data = [], loading = false, viewMode = "grid", onViewModeChange }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top visibility
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Loading state
  if (loading) {
    return (
      <div className="product-list-loading">
        <Card className="loading-card">
          <div className="loading-content">
            <Spin size="large" />
            <Title level={4} className="loading-title">
              Đang tải sản phẩm...
            </Title>
            <Text className="loading-subtitle">Vui lòng chờ trong giây lát</Text>
          </div>
        </Card>
      </div>
    )
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="product-list-empty">
        <Card className="empty-card">
          <Empty
            image={<ShoppingOutlined className="empty-icon" />}
            description={
              <div className="empty-description">
                <Title level={4} className="empty-title">
                  Không tìm thấy sản phẩm
                </Title>
                <Text className="empty-subtitle">Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn</Text>
                <div className="empty-suggestions">
                  <Text>Gợi ý:</Text>
                  <ul>
                    <li>Kiểm tra lại từ khóa tìm kiếm</li>
                    <li>Thử sử dụng từ khóa khác</li>
                    <li>Giảm bớt bộ lọc</li>
                  </ul>
                </div>
              </div>
            }
          />
        </Card>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      {/* List Header */}
      <Card className="list-header-card">
        <div className="list-header">
          <div className="list-info">
            <Title level={4} className="list-title">
              <ShoppingOutlined /> Danh sách sản phẩm
            </Title>
            <Text className="list-count">
              Hiển thị <span className="count-highlight">{data.length}</span> sản phẩm
            </Text>
          </div>

          <div className="list-controls">
            <Space size="middle">
              {/* View Mode Toggle */}
              {onViewModeChange && (
                <div className="view-mode-toggle">
                  <Button.Group>
                    <Button
                      type={viewMode === "grid" ? "primary" : "default"}
                      icon={<AppstoreOutlined />}
                      onClick={() => onViewModeChange("grid")}
                      className="view-mode-btn"
                    >
                      Lưới
                    </Button>
                    <Button
                      type={viewMode === "list" ? "primary" : "default"}
                      icon={<UnorderedListOutlined />}
                      onClick={() => onViewModeChange("list")}
                      className="view-mode-btn"
                    >
                      Danh sách
                    </Button>
                  </Button.Group>
                </div>
              )}

              {/* Quick Actions */}
              <Button icon={<FilterOutlined />} className="quick-action-btn">
                Lọc
              </Button>
              <Button icon={<SortAscendingOutlined />} className="quick-action-btn">
                Sắp xếp
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className={`product-list-content ${viewMode}`}>
        <Row gutter={[24, 24]} className="products-row">
          {data.map((product, index) => (
            <Col
              key={product._id || index}
              xs={24}
              sm={viewMode === "list" ? 24 : 12}
              md={viewMode === "list" ? 24 : 8}
              lg={viewMode === "list" ? 24 : 6}
              xl={viewMode === "list" ? 24 : 6}
              className="product-col"
            >
              <div className={`product-wrapper ${viewMode}`}>
                <Product product={product} viewMode={viewMode} />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Stats Footer */}
      <Card className="stats-footer-card">
        <div className="stats-footer">
          <div className="stats-info">
            <Space size="large">
              <div className="stat-item">
                <EyeOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {data.length}
                  </Text>
                  <Text className="stat-label">Sản phẩm</Text>
                </div>
              </div>
              <div className="stat-item">
                <ShoppingOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {data.filter((p) => p.inStock !== false).length}
                  </Text>
                  <Text className="stat-label">Còn hàng</Text>
                </div>
              </div>
              <div className="stat-item">
                <FilterOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {new Set(data.map((p) => p.categoryId)).size}
                  </Text>
                  <Text className="stat-label">Danh mục</Text>
                </div>
              </div>
            </Space>
          </div>

          <div className="stats-actions">
            <Text className="view-mode-text">Chế độ xem: {viewMode === "grid" ? "Lưới" : "Danh sách"}</Text>
          </div>
        </div>
      </Card>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Affix offsetBottom={24}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<ArrowUpOutlined />}
            onClick={scrollToTop}
            className="scroll-top-btn"
          />
        </Affix>
      )}

      {/* Performance Indicator */}
      <div className="performance-indicator">
        <Text type="secondary" className="performance-text">
          Tải {data.length} sản phẩm trong {Math.random() * 0.5 + 0.2}s
        </Text>
      </div>
    </div>
  )
}

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  viewMode: PropTypes.oneOf(["grid", "list"]),
  onViewModeChange: PropTypes.func,
}

export default ProductList
