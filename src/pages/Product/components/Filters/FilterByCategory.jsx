"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, Menu, Typography, Space, Badge, Spin, Alert, Empty, Button } from "antd"
import {
  AppstoreOutlined,
  FilterOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  FolderOutlined,
  RightOutlined,
} from "@ant-design/icons"
import categoryApi from "../../../../api/categoryApi"
import "./filter-by-category-style.css"

const { Title, Text } = Typography

function FilterByCategory({ onChange, showHeader = true, compact = false, selectedCategory = null }) {
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [hoveredKey, setHoveredKey] = useState(null)

  useEffect(() => {
    fetchCategoryData()
  }, [])

  const fetchCategoryData = async () => {
    try {
      setLoading(true)
      setError(null)
      const list = await categoryApi.getAll()

      const formattedList = list.map((x) => ({
        id: x._id,
        name: x.name,
        gender: x.gender,
        productCount: x.productCount || 0,
        icon: x.icon || <FolderOutlined />,
        description: x.description,
        isActive: x.isActive !== false,
      }))

      setCategoryList(formattedList)
    } catch (error) {
      console.error("Failed to fetch category list", error)
      setError("Không thể tải danh sách danh mục")
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    const newSelectedKeys = selectedKeys.includes(category.id) ? [] : [category.id]
    setSelectedKeys(newSelectedKeys)

    if (onChange) {
      onChange(category.gender)
    }
  }

  const handleRetry = () => {
    fetchCategoryData()
  }

  const clearSelection = () => {
    setSelectedKeys([])
    if (onChange) {
      onChange(null)
    }
  }

  // Menu items for Ant Design Menu
  const menuItems = categoryList
    .filter((category) => category.isActive)
    .map((category) => ({
      key: category.id,
      icon: category.icon,
      label: (
        <div className="category-menu-item">
          <div className="category-content">
            <Text strong className="category-name">
              {category.name}
            </Text>
            {category.description && (
              <Text className="category-description" type="secondary">
                {category.description}
              </Text>
            )}
          </div>
          <div className="category-meta">
            <Badge count={category.productCount} showZero className="product-count-badge" />
            {selectedKeys.includes(category.id) && <CheckCircleOutlined className="selected-icon" />}
          </div>
        </div>
      ),
      onClick: () => handleCategoryClick(category),
    }))

  // Loading state
  if (loading) {
    return (
      <Card className="filter-category-card loading-card">
        <div className="loading-container">
          <Spin size="large" />
          <Text className="loading-text">Đang tải danh mục...</Text>
        </div>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card className="filter-category-card error-card">
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={handleRetry}>
              Thử lại
            </Button>
          }
          className="error-alert"
        />
      </Card>
    )
  }

  // Empty state
  if (categoryList.length === 0) {
    return (
      <Card className="filter-category-card empty-card">
        <Empty
          image={<AppstoreOutlined className="empty-icon" />}
          description={
            <div className="empty-description">
              <Text>Không có danh mục nào</Text>
              <br />
              <Text type="secondary">Vui lòng thử lại sau</Text>
            </div>
          }
        />
      </Card>
    )
  }

  return (
    <div className={`filter-category-container ${compact ? "compact" : ""}`}>
      <Card className="filter-category-card">
        {showHeader && (
          <div className="filter-header">
            <div className="header-content">
              <div className="header-title">
                <FilterOutlined className="header-icon" />
                <Title level={4} className="header-text">
                  Lọc theo danh mục
                </Title>
                {selectedKeys.length > 0 && <Badge count={selectedKeys.length} className="selection-badge" />}
              </div>
              <Text className="header-subtitle">Chọn danh mục sản phẩm để lọc kết quả</Text>
            </div>

            {selectedKeys.length > 0 && (
              <div className="header-actions">
                <Button
                  type="text"
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={clearSelection}
                  className="clear-btn"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="filter-content">
          {compact ? (
            // Compact list view
            <div className="category-list compact">
              {categoryList
                .filter((category) => category.isActive)
                .map((category) => (
                  <div
                    key={category.id}
                    className={`category-item compact ${selectedKeys.includes(category.id) ? "selected" : ""}`}
                    onClick={() => handleCategoryClick(category)}
                    onMouseEnter={() => setHoveredKey(category.id)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <div className="category-icon">{category.icon}</div>
                    <div className="category-info">
                      <Text strong className="category-name">
                        {category.name}
                      </Text>
                      <Badge count={category.productCount} showZero className="product-count" />
                    </div>
                    <div className="category-arrow">
                      <RightOutlined />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Full menu view
            <Menu
              mode="vertical"
              selectedKeys={selectedKeys}
              items={menuItems}
              className="category-menu"
              expandIcon={<RightOutlined />}
            />
          )}
        </div>

        {/* Statistics Footer */}
        <div className="filter-footer">
          <div className="footer-stats">
            <Space size="large">
              <div className="stat-item">
                <AppstoreOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {categoryList.filter((c) => c.isActive).length}
                  </Text>
                  <Text className="stat-label">Danh mục</Text>
                </div>
              </div>
              <div className="stat-item">
                <ShoppingOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {categoryList.reduce((sum, c) => sum + c.productCount, 0)}
                  </Text>
                  <Text className="stat-label">Sản phẩm</Text>
                </div>
              </div>
              {selectedKeys.length > 0 && (
                <div className="stat-item">
                  <CheckCircleOutlined className="stat-icon selected" />
                  <div className="stat-content">
                    <Text strong className="stat-number selected">
                      {selectedKeys.length}
                    </Text>
                    <Text className="stat-label">Đã chọn</Text>
                  </div>
                </div>
              )}
            </Space>
          </div>
        </div>
      </Card>
    </div>
  )
}

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  showHeader: PropTypes.bool,
  compact: PropTypes.bool,
  selectedCategory: PropTypes.string,
}

export default FilterByCategory
