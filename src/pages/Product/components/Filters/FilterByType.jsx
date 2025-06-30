"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, List, Typography, Space, Badge, Spin, Alert, Empty, Button, Checkbox, Radio } from "antd"
import {
  TagsOutlined,
  FilterOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  RightOutlined,
  ClearOutlined,
} from "@ant-design/icons"
import categoryApi from "../../../../api/categoryApi"
import "./filter-by-type-style.css"

const { Title, Text } = Typography

function FilterByType({
  typeGender,
  onChange,
  showHeader = true,
  compact = false,
  multiSelect = false,
  layout = "list",
  showCounts = true,
}) {
  const [typeList, setTypeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [hoveredType, setHoveredType] = useState(null)

  useEffect(() => {
    if (typeGender?.type) {
      fetchTypeData()
    } else {
      setTypeList([])
      setLoading(false)
    }
  }, [typeGender?.type])

  const fetchTypeData = async () => {
    try {
      setLoading(true)
      setError(null)
      const list = await categoryApi.getTypesByGender(typeGender.type)

      const formattedList = list.map((x) => ({
        id: x._id,
        name: x.name,
        description: x.description,
        productCount: x.productCount || 0,
        icon: x.icon || <TagsOutlined />,
        isActive: x.isActive !== false,
        color: x.color || "#1e3a8a",
      }))

      setTypeList(formattedList)
    } catch (error) {
      console.error("Failed to fetch type list", error)
      setError("Không thể tải danh sách loại sản phẩm")
    } finally {
      setLoading(false)
    }
  }

  const handleTypeClick = (type) => {
    if (multiSelect) {
      const newSelectedTypes = selectedTypes.includes(type.id)
        ? selectedTypes.filter((id) => id !== type.id)
        : [...selectedTypes, type.id]
      setSelectedTypes(newSelectedTypes)

      if (onChange) {
        onChange(newSelectedTypes)
      }
    } else {
      const newSelection = selectedTypes.includes(type.id) ? [] : [type.id]
      setSelectedTypes(newSelection)

      if (onChange) {
        onChange(newSelection.length > 0 ? type : null)
      }
    }
  }

  const handleRetry = () => {
    fetchTypeData()
  }

  const clearSelection = () => {
    setSelectedTypes([])
    if (onChange) {
      onChange(multiSelect ? [] : null)
    }
  }

  const renderTypeItem = (type) => {
    const isSelected = selectedTypes.includes(type.id)
    const isHovered = hoveredType === type.id

    return (
      <div
        key={type.id}
        className={`type-item ${layout} ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
        onClick={() => handleTypeClick(type)}
        onMouseEnter={() => setHoveredType(type.id)}
        onMouseLeave={() => setHoveredType(null)}
      >
        <div className="type-content">
          {multiSelect && (
            <Checkbox
              checked={isSelected}
              onChange={() => handleTypeClick(type)}
              className="type-checkbox"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {!multiSelect && layout === "card" && (
            <Radio
              checked={isSelected}
              onChange={() => handleTypeClick(type)}
              className="type-radio"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          <div className="type-icon-wrapper">
            <div className="type-icon" style={{ color: type.color }}>
              {type.icon}
            </div>
          </div>

          <div className="type-info">
            <Text strong className="type-name">
              {type.name}
            </Text>
            {type.description && (
              <Text className="type-description" type="secondary">
                {type.description}
              </Text>
            )}
            {showCounts && (
              <div className="type-stats">
                <Badge count={type.productCount} showZero className="product-count-badge" />
                <Text className="product-count-text">{type.productCount} sản phẩm</Text>
              </div>
            )}
          </div>

          <div className="type-actions">
            {isSelected && <CheckCircleOutlined className="selected-icon" />}
            {!compact && <RightOutlined className="arrow-icon" />}
          </div>
        </div>

        {isSelected && <div className="selection-indicator" />}
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <Card className="filter-type-card loading-card">
        <div className="loading-container">
          <Spin size="large" />
          <Text className="loading-text">Đang tải loại sản phẩm...</Text>
        </div>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card className="filter-type-card error-card">
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
  if (typeList.length === 0) {
    return (
      <Card className="filter-type-card empty-card">
        <Empty
          image={<TagsOutlined className="empty-icon" />}
          description={
            <div className="empty-description">
              <Text>Không có loại sản phẩm nào</Text>
              <br />
              <Text type="secondary">
                {typeGender?.type ? "Danh mục này chưa có loại sản phẩm" : "Vui lòng chọn danh mục trước"}
              </Text>
            </div>
          }
        />
      </Card>
    )
  }

  return (
    <div className={`filter-type-container ${compact ? "compact" : ""}`}>
      <Card className="filter-type-card">
        {showHeader && (
          <div className="filter-header">
            <div className="header-content">
              <div className="header-title">
                <FilterOutlined className="header-icon" />
                <Title level={4} className="header-text">
                  Lọc theo loại
                </Title>
                {selectedTypes.length > 0 && <Badge count={selectedTypes.length} className="selection-badge" />}
              </div>
              <Text className="header-subtitle">
                {multiSelect ? "Chọn một hoặc nhiều loại sản phẩm" : "Chọn loại sản phẩm để lọc kết quả"}
              </Text>
            </div>

            {selectedTypes.length > 0 && (
              <div className="header-actions">
                <Button
                  type="text"
                  size="small"
                  icon={<ClearOutlined />}
                  onClick={clearSelection}
                  className="clear-btn"
                >
                  Xóa bộ lọc ({selectedTypes.length})
                </Button>
              </div>
            )}
          </div>
        )}

        <div className={`filter-content ${layout}`}>
          {layout === "grid" ? (
            <div className="type-grid">{typeList.filter((type) => type.isActive).map(renderTypeItem)}</div>
          ) : layout === "card" ? (
            <div className="type-cards">
              {typeList
                .filter((type) => type.isActive)
                .map((type) => (
                  <Card
                    key={type.id}
                    className={`type-card ${selectedTypes.includes(type.id) ? "selected" : ""}`}
                    hoverable
                    onClick={() => handleTypeClick(type)}
                    size="small"
                  >
                    <div className="card-content">
                      <div className="card-header">
                        <div className="card-icon" style={{ color: type.color }}>
                          {type.icon}
                        </div>
                        {selectedTypes.includes(type.id) && <CheckCircleOutlined className="card-selected-icon" />}
                      </div>
                      <Title level={5} className="card-title">
                        {type.name}
                      </Title>
                      {type.description && (
                        <Text className="card-description" type="secondary">
                          {type.description}
                        </Text>
                      )}
                      {showCounts && (
                        <div className="card-stats">
                          <Badge count={type.productCount} showZero />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <List
              className="type-list"
              dataSource={typeList.filter((type) => type.isActive)}
              renderItem={renderTypeItem}
              size="small"
            />
          )}
        </div>

        {/* Statistics Footer */}
        <div className="filter-footer">
          <div className="footer-stats">
            <Space size="large">
              <div className="stat-item">
                <TagsOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {typeList.filter((t) => t.isActive).length}
                  </Text>
                  <Text className="stat-label">Loại</Text>
                </div>
              </div>
              <div className="stat-item">
                <ShoppingOutlined className="stat-icon" />
                <div className="stat-content">
                  <Text strong className="stat-number">
                    {typeList.reduce((sum, t) => sum + t.productCount, 0)}
                  </Text>
                  <Text className="stat-label">Sản phẩm</Text>
                </div>
              </div>
              {selectedTypes.length > 0 && (
                <div className="stat-item">
                  <CheckCircleOutlined className="stat-icon selected" />
                  <div className="stat-content">
                    <Text strong className="stat-number selected">
                      {selectedTypes.length}
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

FilterByType.propTypes = {
  typeGender: PropTypes.object,
  onChange: PropTypes.func,
  showHeader: PropTypes.bool,
  compact: PropTypes.bool,
  multiSelect: PropTypes.bool,
  layout: PropTypes.oneOf(["list", "grid", "card"]),
  showCounts: PropTypes.bool,
}

export default FilterByType
