"use client"
import { Result, Button, Typography } from "antd"
import { SearchOutlined, HomeOutlined, ReloadOutlined } from "@ant-design/icons"
import PropTypes from "prop-types"
import "./product-clear-style.css"

const { Text } = Typography

function ProductClear({ onResetFilters, onGoHome, searchQuery, hasFilters }) {
  return (
    <div className="product-clear-container">
      <Result
        className="product-clear-result"
        icon={<SearchOutlined className="product-clear-icon" />}
        title="Không tìm thấy sản phẩm phù hợp"
        subTitle={
          <div className="product-clear-subtitle">
            <Text className="product-clear-text">
              {searchQuery
                ? `Không có sản phẩm nào khớp với từ khóa "${searchQuery}"`
                : "Không có sản phẩm nào phù hợp với tiêu chí lọc hiện tại"}
            </Text>
            <div className="product-clear-suggestions">
              <Text className="suggestion-title">Gợi ý cho bạn:</Text>
              <ul className="suggestion-list">
                <li>Thử sử dụng từ khóa khác</li>
                <li>Kiểm tra lại chính tả</li>
                <li>Sử dụng từ khóa tổng quát hơn</li>
                {hasFilters && <li>Xóa bớt bộ lọc để mở rộng kết quả</li>}
              </ul>
            </div>
          </div>
        }
        extra={
          <div className="product-clear-actions">
            {hasFilters && (
              <Button type="primary" icon={<ReloadOutlined />} onClick={onResetFilters} className="reset-button">
                Xóa bộ lọc
              </Button>
            )}
            <Button icon={<HomeOutlined />} onClick={onGoHome} className="home-button">
              Về trang chủ
            </Button>
          </div>
        }
      />

      <div className="popular-categories">
        <Text className="popular-title">Danh mục phổ biến:</Text>
        <div className="category-tags">
          <Button type="link" className="category-tag">
            Bút viết
          </Button>
          <Button type="link" className="category-tag">
            Giấy A4
          </Button>
          <Button type="link" className="category-tag">
            Sổ tay
          </Button>
          <Button type="link" className="category-tag">
            Kẹp tài liệu
          </Button>
          <Button type="link" className="category-tag">
            Máy tính
          </Button>
        </div>
      </div>
    </div>
  )
}

ProductClear.propTypes = {
  onResetFilters: PropTypes.func,
  onGoHome: PropTypes.func,
  searchQuery: PropTypes.string,
  hasFilters: PropTypes.bool,
}

ProductClear.defaultProps = {
  onResetFilters: () => {},
  onGoHome: () => {},
  searchQuery: "",
  hasFilters: false,
}

export default ProductClear
