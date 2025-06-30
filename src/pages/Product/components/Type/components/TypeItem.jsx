"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { Card, Typography, Badge, Button, Space, Tooltip } from "antd"
import {
  CheckCircleOutlined,
  PlusOutlined,
  TagOutlined,
  ShoppingOutlined,
  EyeOutlined,
  StarOutlined,
} from "@ant-design/icons"
import "./type-item-style.css"

const { Text, Title } = Typography

function TypeItem({
  onChange,
  onSelect,
  data,
  selected = false,
  compact = false,
  layout = "vertical",
  showIndex,
  showStats = true,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (onChange) {
      setIsLoading(true)
      try {
        await onChange(data._id)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSelect = (e) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(data._id, !selected)
    }
  }

  const renderVerticalLayout = () => (
    <div className="type-item-content vertical">
      <div className="image-container">
        <div className="image-wrapper">
          <img
            src={data.image || "/placeholder.svg?height=120&width=200"}
            alt={data.name}
            className="type-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=120&width=200"
            }}
          />
          {selected && (
            <div className="selection-overlay">
              <CheckCircleOutlined className="selection-icon" />
            </div>
          )}
          {data.isNew && <Badge.Ribbon text="Mới" color="red" className="new-ribbon" />}
          {data.isHot && <Badge.Ribbon text="Hot" color="orange" className="hot-ribbon" />}
        </div>

        {/* Hover Actions */}
        <div className="hover-actions">
          <Space>
            <Tooltip title={selected ? "Bỏ chọn" : "Chọn loại này"}>
              <Button
                type={selected ? "primary" : "default"}
                icon={selected ? <CheckCircleOutlined /> : <PlusOutlined />}
                onClick={handleSelect}
                className="action-btn select-btn"
                size="small"
              />
            </Tooltip>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />} onClick={handleClick} className="action-btn view-btn" size="small" />
            </Tooltip>
          </Space>
        </div>
      </div>

      <div className="content-section">
        <div className="title-section">
          <Title level={5} className="type-title">
            {data.name}
          </Title>
          {data.description && (
            <Text className="type-description" ellipsis={{ tooltip: data.description }}>
              {data.description}
            </Text>
          )}
        </div>

        {showStats && (
          <div className="stats-section">
            <Space size="small">
              <div className="stat-item">
                <ShoppingOutlined className="stat-icon" />
                <Text className="stat-text">{data.productCount || 0} SP</Text>
              </div>
              {data.rating && (
                <div className="stat-item">
                  <StarOutlined className="stat-icon" />
                  <Text className="stat-text">{data.rating}</Text>
                </div>
              )}
            </Space>
          </div>
        )}

        <div className="action-section">
          <Button
            type={selected ? "primary" : "default"}
            block
            onClick={handleClick}
            loading={isLoading}
            className="main-action-btn"
            icon={<TagOutlined />}
          >
            {selected ? "Đã chọn" : "Chọn loại này"}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderHorizontalLayout = () => (
    <div className="type-item-content horizontal">
      {showIndex && (
        <div className="index-number">
          <Text strong className="index-text">
            {showIndex}
          </Text>
        </div>
      )}

      <div className="image-container horizontal">
        <img
          src={data.image || "/placeholder.svg?height=80&width=80"}
          alt={data.name}
          className="type-image horizontal"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=80&width=80"
          }}
        />
        {selected && (
          <div className="selection-overlay horizontal">
            <CheckCircleOutlined className="selection-icon" />
          </div>
        )}
      </div>

      <div className="content-section horizontal">
        <div className="main-content">
          <Title level={5} className="type-title horizontal">
            {data.name}
          </Title>
          {data.description && (
            <Text className="type-description horizontal" ellipsis={{ tooltip: data.description }}>
              {data.description}
            </Text>
          )}
        </div>

        {showStats && (
          <div className="stats-section horizontal">
            <Space size="middle">
              <div className="stat-item">
                <ShoppingOutlined className="stat-icon" />
                <Text className="stat-text">{data.productCount || 0} sản phẩm</Text>
              </div>
              {data.rating && (
                <div className="stat-item">
                  <StarOutlined className="stat-icon" />
                  <Text className="stat-text">{data.rating} sao</Text>
                </div>
              )}
            </Space>
          </div>
        )}
      </div>

      <div className="action-section horizontal">
        <Space>
          <Button
            type={selected ? "primary" : "default"}
            icon={selected ? <CheckCircleOutlined /> : <PlusOutlined />}
            onClick={handleSelect}
            className="select-action-btn"
          >
            {selected ? "Đã chọn" : "Chọn"}
          </Button>
          <Button icon={<EyeOutlined />} onClick={handleClick} loading={isLoading} className="view-action-btn">
            Xem
          </Button>
        </Space>
      </div>
    </div>
  )

  return (
    <Card
      className={`type-item-card ${layout} ${compact ? "compact" : ""} ${selected ? "selected" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      hoverable
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      loading={isLoading}
      bodyStyle={{ padding: compact ? "0.75rem" : "1rem" }}
    >
      {layout === "horizontal" ? renderHorizontalLayout() : renderVerticalLayout()}

      {/* Selection Indicator */}
      {selected && <div className="selection-indicator" />}

      {/* Loading Overlay */}
      {isLoading && <div className="loading-overlay" />}
    </Card>
  )
}

TypeItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  compact: PropTypes.bool,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  showIndex: PropTypes.number,
  showStats: PropTypes.bool,
}

export default TypeItem
