"use client"
import PropTypes from "prop-types"
import { useState } from "react"
import { Button, Dropdown, Space, Typography, Tooltip } from "antd"
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  CalendarOutlined,
  StarOutlined,
  FireOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons"
import "./product-sort-style.css"

const { Text } = Typography

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

function ProductSort({ currentSort, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSortChange = (value) => {
    if (onChange) onChange(value)
    setIsOpen(false)
  }

  const sortOptions = [
    {
      value: "asc",
      label: "Giá thấp đến cao",
      icon: <SortAscendingOutlined />,
    },
    {
      value: "desc",
      label: "Giá cao đến thấp",
      icon: <SortDescendingOutlined />,
    },
    {
      value: "newest",
      label: "Mới nhất",
      icon: <CalendarOutlined />,
    },
    {
      value: "popular",
      label: "Phổ biến",
      icon: <FireOutlined />,
    },
    {
      value: "rating",
      label: "Đánh giá cao",
      icon: <StarOutlined />,
    },
  ]

  const getCurrentOption = () => {
    return sortOptions.find((option) => option.value === currentSort) || sortOptions[0]
  }

  const dropdownItems = sortOptions.map((option) => ({
    key: option.value,
    label: (
      <div className="sort-dropdown-item">
        <Space>
          {option.icon}
          <Text className={currentSort === option.value ? "sort-item-active" : "sort-item"}>{option.label}</Text>
        </Space>
      </div>
    ),
    onClick: () => handleSortChange(option.value),
  }))

  return (
    <div className="product-sort-icon-container">
      <Dropdown
        menu={{ items: dropdownItems }}
        trigger={["click"]}
        placement="bottomRight"
        open={isOpen}
        onOpenChange={setIsOpen}
        overlayClassName="product-sort-dropdown"
      >
        <Tooltip title={`Sắp xếp: ${getCurrentOption().label}`} placement="top">
          <Button type="text" className="sort-icon-button" onClick={() => setIsOpen(!isOpen)}>
            <Space size={4}>
              {getCurrentOption().icon}
              {isOpen ? <UpOutlined /> : <DownOutlined />}
            </Space>
          </Button>
        </Tooltip>
      </Dropdown>
    </div>
  )
}

export default ProductSort
