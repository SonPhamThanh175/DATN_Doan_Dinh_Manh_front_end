"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { Card, Typography, Badge, Button, Space, Rate, Tag, Tooltip } from "antd"
import { useNavigate } from "react-router-dom"
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  EyeOutlined,
  TagOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
import { formatPrice } from "../../../utils/common"
import "./product-style.css"

const { Text, Title } = Typography
const { Meta } = Card

function Product({ product, viewMode = "grid", showActions = true, showRating = true, compact = false }) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    navigate(`/products/${product._id}`)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    // Add to cart logic here
    console.log("Added to cart:", product._id)
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    // Quick view logic here
    console.log("Quick view:", product._id)
  }

  const handleShare = (e) => {
    e.stopPropagation()
    // Share logic here
    console.log("Share:", product._id)
  }

  const thumbnailUrl = product.images?.[0] || "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png"
  const hoverImageUrl =
    product.images?.[1] || product.images?.[0] || "https://azdigi.com/blog/wp-content/uploads/2022/12/404-error.png"

  // Calculate discount percentage
  const discountPercentage =
    product.originalPrice && product.originalPrice > product.salePrice
      ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
      : 0

  // Product badges
  const getBadges = () => {
    const badges = []
    if (product.isNew) badges.push({ text: "Mới", color: "green" })
    if (product.isHot) badges.push({ text: "Hot", color: "red" })
    if (product.isBestSeller) badges.push({ text: "Bán chạy", color: "orange" })
    if (discountPercentage > 0) badges.push({ text: `-${discountPercentage}%`, color: "red" })
    return badges
  }

  const renderGridView = () => (
    <Card
      className={`product-card grid ${compact ? "compact" : ""} ${isHovered ? "hovered" : ""}`}
      hoverable
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cover={
        <div className="product-image-container">
          {/* Badges */}
          <div className="product-badges">
            {getBadges().map((badge, index) => (
              <Badge key={index} count={badge.text} style={{ backgroundColor: badge.color }} />
            ))}
          </div>

          {/* Wishlist Button */}
          <div className="wishlist-btn">
            <Button
              type="text"
              shape="circle"
              icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
              className={`heart-btn ${isLiked ? "liked" : ""}`}
            />
          </div>

          {/* Product Image */}
          <div className="image-wrapper">
            <img
              src={isHovered && hoverImageUrl !== thumbnailUrl ? hoverImageUrl : thumbnailUrl}
              alt={product.name}
              className="product-image"
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="image-fallback">
                <TagOutlined />
                <Text>Không có hình ảnh</Text>
              </div>
            )}
          </div>

          {/* Hover Actions */}
          {showActions && (
            <div className="hover-actions">
              <Space direction="vertical" size="small">
                <Tooltip title="Thêm vào giỏ hàng">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="action-btn cart-btn"
                  />
                </Tooltip>
                <Tooltip title="Xem nhanh">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<EyeOutlined />}
                    onClick={handleQuickView}
                    className="action-btn view-btn"
                  />
                </Tooltip>
                <Tooltip title="Chia sẻ">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<ShareAltOutlined />}
                    onClick={handleShare}
                    className="action-btn share-btn"
                  />
                </Tooltip>
              </Space>
            </div>
          )}

          {/* Stock Status */}
          {product.stock !== undefined && (
            <div className="stock-status">
              {product.stock > 0 ? (
                <Tag color="green">Còn hàng ({product.stock})</Tag>
              ) : (
                <Tag color="red">Hết hàng</Tag>
              )}
            </div>
          )}
        </div>
      }
      bodyStyle={{ padding: compact ? "12px" : "16px" }}
    >
      <Meta
        title={
          <div className="product-info">
            <Title level={5} className="product-name" ellipsis={{ tooltip: product.name }}>
              {product.name}
            </Title>
            {product.brand && (
              <Text className="product-brand" type="secondary">
                {product.brand}
              </Text>
            )}
          </div>
        }
        description={
          <div className="product-details">
            {product.description && (
              <Text className="product-description" ellipsis={{ tooltip: product.description }}>
                {product.description}
              </Text>
            )}

            {showRating && product.rating && (
              <div className="product-rating">
                <Rate disabled value={product.rating} size="small" />
                <Text className="rating-text">({product.reviewCount || 0})</Text>
              </div>
            )}

            <div className="product-pricing">
              <div className="price-container">
                <Text strong className="sale-price">
                  {formatPrice(product.salePrice)}
                </Text>
                {product.originalPrice && product.originalPrice > product.salePrice && (
                  <Text delete className="original-price">
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
              </div>
              {discountPercentage > 0 && <Text className="discount-text">Tiết kiệm {discountPercentage}%</Text>}
            </div>

            {product.category && (
              <div className="product-category">
                <Tag color="blue" size="small">
                  {product.category}
                </Tag>
              </div>
            )}
          </div>
        }
      />
    </Card>
  )

  const renderListView = () => (
    <Card
      className={`product-card list ${compact ? "compact" : ""} ${isHovered ? "hovered" : ""}`}
      hoverable
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bodyStyle={{ padding: compact ? "12px" : "16px" }}
    >
      <div className="list-content">
        {/* Product Image */}
        <div className="list-image-container">
          {/* Badges */}
          <div className="product-badges">
            {getBadges().map((badge, index) => (
              <Badge key={index} count={badge.text} style={{ backgroundColor: badge.color }} />
            ))}
          </div>

          <div className="image-wrapper">
            <img
              src={isHovered && hoverImageUrl !== thumbnailUrl ? hoverImageUrl : thumbnailUrl}
              alt={product.name}
              className="product-image"
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="image-fallback">
                <TagOutlined />
                <Text>Không có hình ảnh</Text>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="list-info">
          <div className="list-header">
            <Title level={4} className="product-name" ellipsis={{ tooltip: product.name }}>
              {product.name}
            </Title>
            <div className="wishlist-btn">
              <Button
                type="text"
                shape="circle"
                icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleLike}
                className={`heart-btn ${isLiked ? "liked" : ""}`}
              />
            </div>
          </div>

          {product.brand && (
            <Text className="product-brand" type="secondary">
              {product.brand}
            </Text>
          )}

          {product.description && (
            <Text className="product-description" ellipsis={{ rows: 2, tooltip: product.description }}>
              {product.description}
            </Text>
          )}

          {showRating && product.rating && (
            <div className="product-rating">
              <Rate disabled value={product.rating} size="small" />
              <Text className="rating-text">({product.reviewCount || 0} đánh giá)</Text>
            </div>
          )}

          <div className="product-pricing">
            <div className="price-container">
              <Text strong className="sale-price">
                {formatPrice(product.salePrice)}
              </Text>
              {product.originalPrice && product.originalPrice > product.salePrice && (
                <Text delete className="original-price">
                  {formatPrice(product.originalPrice)}
                </Text>
              )}
            </div>
            {discountPercentage > 0 && <Text className="discount-text">Tiết kiệm {discountPercentage}%</Text>}
          </div>

          <div className="list-footer">
            <div className="product-meta">
              {product.category && (
                <Tag color="blue" size="small">
                  {product.category}
                </Tag>
              )}
              {product.stock !== undefined && (
                <Tag color={product.stock > 0 ? "green" : "red"} size="small">
                  {product.stock > 0 ? `Còn ${product.stock}` : "Hết hàng"}
                </Tag>
              )}
            </div>

            {showActions && (
              <div className="list-actions">
                <Space>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Thêm vào giỏ
                  </Button>
                  <Button icon={<EyeOutlined />} onClick={handleQuickView}>
                    Xem nhanh
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  return viewMode === "list" ? renderListView() : renderGridView()
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    salePrice: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    images: PropTypes.array,
    category: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    stock: PropTypes.number,
    isNew: PropTypes.bool,
    isHot: PropTypes.bool,
    isBestSeller: PropTypes.bool,
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]),
  showActions: PropTypes.bool,
  showRating: PropTypes.bool,
  compact: PropTypes.bool,
}

export default Product
