"use client"
import PropTypes from "prop-types"
import { Select, Radio, Card, Space, Typography, Button, Dropdown } from "antd"
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  DollarOutlined,
  CalendarOutlined,
  StarOutlined,
  FireOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons"
import "./product-sort-style.css"

const { Text } = Typography

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showAdvanced: PropTypes.bool,
  compact: PropTypes.bool,
}

function ProductSort({ currentSort, onChange, showAdvanced = false, compact = false }) {
  const handleSortChange = (value) => {
    if (onChange) onChange(value)
  }

  const sortOptions = [
    {
      value: "asc",
      label: "Giá thấp đến cao",
      icon: <SortAscendingOutlined />,
      description: "Sắp xếp theo giá từ thấp đến cao",
    },
    {
      value: "desc",
      label: "Giá cao đến thấp",
      icon: <SortDescendingOutlined />,
      description: "Sắp xếp theo giá từ cao đến thấp",
    },
    {
      value: "newest",
      label: "Mới nhất",
      icon: <CalendarOutlined />,
      description: "Sản phẩm mới nhất trước",
    },
    {
      value: "popular",
      label: "Phổ biến",
      icon: <FireOutlined />,
      description: "Sản phẩm bán chạy nhất",
    },
    {
      value: "rating",
      label: "Đánh giá cao",
      icon: <StarOutlined />,
      description: "Sắp xếp theo đánh giá",
    },
    {
      value: "name",
      label: "Tên A-Z",
      icon: <SortAscendingOutlined />,
      description: "Sắp xếp theo tên từ A-Z",
    },
  ]

  const getCurrentOption = () => {
    return sortOptions.find((option) => option.value === currentSort) || sortOptions[0]
  }

  // Compact dropdown version
  if (compact) {
    const dropdownItems = sortOptions.map((option) => ({
      key: option.value,
      label: (
        <div className="dropdown-item">
          <Space>
            {option.icon}
            <div className="dropdown-content">
              <Text strong className="dropdown-label">
                {option.label}
              </Text>
              <Text className="dropdown-description">{option.description}</Text>
            </div>
          </Space>
        </div>
      ),
      onClick: () => handleSortChange(option.value),
    }))

    return (
      <div className="product-sort-compact">
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottomRight" className="sort-dropdown">
          <Button className="sort-trigger-btn">
            <Space>
              <FilterOutlined />
              <Text className="sort-trigger-text">{getCurrentOption().label}</Text>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    )
  }

  // Full version with tabs/radio
  return (
    <div className="product-sort-container">
      <Card className="sort-card">
        <div className="sort-header">
          <div className="sort-title">
            <DollarOutlined className="sort-icon" />
            <Text strong className="sort-label">
              Sắp xếp sản phẩm
            </Text>
          </div>
          <Text className="sort-subtitle">Chọn cách sắp xếp phù hợp với bạn</Text>
        </div>

        {showAdvanced ? (
          // Advanced version with Select
          <div className="sort-advanced">
            <Select
              value={currentSort}
              onChange={handleSortChange}
              className="sort-select"
              size="large"
              placeholder="Chọn cách sắp xếp"
              optionLabelProp="label"
            >
              {sortOptions.map((option) => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  <div className="select-option">
                    <Space>
                      {option.icon}
                      <div className="option-content">
                        <Text strong className="option-label">
                          {option.label}
                        </Text>
                        <Text className="option-description">{option.description}</Text>
                      </div>
                    </Space>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        ) : (
          // Standard version with Radio buttons
          <div className="sort-options">
            <Radio.Group
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-radio-group"
              size="large"
            >
              <Space direction="vertical" size="middle" className="radio-space">
                {sortOptions.slice(0, 4).map((option) => (
                  <Radio key={option.value} value={option.value} className="sort-radio">
                    <div className="radio-content">
                      <Space>
                        {option.icon}
                        <div className="radio-text">
                          <Text strong className="radio-label">
                            {option.label}
                          </Text>
                          <Text className="radio-description">{option.description}</Text>
                        </div>
                      </Space>
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        )}

        {/* Quick Sort Buttons */}
        <div className="quick-sort-section">
          <Text className="quick-sort-title">Sắp xếp nhanh:</Text>
          <Space wrap className="quick-sort-buttons">
            <Button
              type={currentSort === "asc" ? "primary" : "default"}
              icon={<SortAscendingOutlined />}
              onClick={() => handleSortChange("asc")}
              className="quick-sort-btn"
              size="small"
            >
              Giá tăng
            </Button>
            <Button
              type={currentSort === "desc" ? "primary" : "default"}
              icon={<SortDescendingOutlined />}
              onClick={() => handleSortChange("desc")}
              className="quick-sort-btn"
              size="small"
            >
              Giá giảm
            </Button>
            <Button
              type={currentSort === "popular" ? "primary" : "default"}
              icon={<FireOutlined />}
              onClick={() => handleSortChange("popular")}
              className="quick-sort-btn"
              size="small"
            >
              Phổ biến
            </Button>
            <Button
              type={currentSort === "newest" ? "primary" : "default"}
              icon={<CalendarOutlined />}
              onClick={() => handleSortChange("newest")}
              className="quick-sort-btn"
              size="small"
            >
              Mới nhất
            </Button>
          </Space>
        </div>

        {/* Current Selection Display */}
        <div className="current-selection">
          <div className="selection-info">
            <Text className="selection-label">Đang sắp xếp theo:</Text>
            <div className="selection-value">
              <Space>
                {getCurrentOption().icon}
                <Text strong className="selection-text">
                  {getCurrentOption().label}
                </Text>
              </Space>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductSort
