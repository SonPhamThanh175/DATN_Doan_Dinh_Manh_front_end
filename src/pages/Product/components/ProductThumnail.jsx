"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { Image, Card, Space, Button, Badge } from "antd"
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  DownloadOutlined,
  EyeOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
import "./product-thumbnail-style.css"

ProductThumbnail.propTypes = {
  product: PropTypes.object,
}

function ProductThumbnail({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Handle multiple images or fallback
  const images = product?.images && Array.isArray(product.images) ? product.images : []
  const hasMultipleImages = images.length > 1

  const thumbnailUrl =
    images.length > 0
      ? images[currentImageIndex]
      : "https://www.toprankindonesia.com/wp-content/uploads/2023/10/4.-Apa-itu-404-not-Found-scaled.jpg"

  const handleImageChange = (index) => {
    setCurrentImageIndex(index)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Sản phẩm",
        text: `Xem sản phẩm: ${product?.name || "Sản phẩm tuyệt vời"}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="product-thumbnail-container">
      {/* Main Image */}
      <Card className="main-image-card">
        <div className="image-wrapper">
          {hasMultipleImages && (
            <Badge count={images.length} className="image-count-badge">
              <EyeOutlined />
            </Badge>
          )}

          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={product?.name || "Product Image"}
            className="main-product-image"
            placeholder={
              <div className="image-placeholder">
                <EyeOutlined />
                <span>Đang tải...</span>
              </div>
            }
            fallback="https://www.toprankindonesia.com/wp-content/uploads/2023/10/4.-Apa-itu-404-not-Found-scaled.jpg"
            preview={{
              mask: (
                <div className="preview-mask">
                  <ZoomInOutlined />
                  <span>Xem chi tiết</span>
                </div>
              ),
              toolbarRender: (
                _,
                {
                  transform: { scale },
                  actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                },
              ) => (
                <Space size={12} className="image-toolbar">
                  <Button type="primary" icon={<ZoomInOutlined />} onClick={onZoomIn} />
                  <Button type="primary" icon={<ZoomOutOutlined />} onClick={onZoomOut} />
                  <Button type="primary" icon={<RotateLeftOutlined />} onClick={onRotateLeft} />
                  <Button type="primary" icon={<RotateRightOutlined />} onClick={onRotateRight} />
                  <Button type="primary" icon={<SwapOutlined />} onClick={onFlipX} />
                  <Button type="primary" icon={<SwapOutlined rotate={90} />} onClick={onFlipY} />
                  <Button type="primary" onClick={onReset}>
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = thumbnailUrl
                      link.download = `${product?.name || "product"}.jpg`
                      link.click()
                    }}
                  >
                    Tải về
                  </Button>
                </Space>
              ),
            }}
          />

          {/* Navigation Arrows for Multiple Images */}
          {hasMultipleImages && (
            <>
              <Button className="nav-button nav-prev" onClick={handlePrevImage} shape="circle" size="large">
                ‹
              </Button>
              <Button className="nav-button nav-next" onClick={handleNextImage} shape="circle" size="large">
                ›
              </Button>
            </>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button
              type={isLiked ? "primary" : "default"}
              icon={<HeartOutlined />}
              onClick={handleLike}
              className={`action-btn ${isLiked ? "liked" : ""}`}
              shape="circle"
              size="large"
            />
            <Button
              type="default"
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              className="action-btn"
              shape="circle"
              size="large"
            />
          </div>
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <Card className="thumbnail-gallery-card">
          <div className="thumbnail-gallery">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleImageChange(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product?.name || "Product"} ${index + 1}`}
                  className="thumbnail-image"
                />
                {index === currentImageIndex && <div className="active-indicator" />}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Product Info Overlay */}
      <div className="product-info-overlay">
        <div className="product-badge">
          {product?.isNew && <Badge status="success" text="Mới" />}
          {product?.isHot && <Badge status="error" text="Hot" />}
          {product?.discount && <Badge count={`-${product.discount}%`} className="discount-badge" />}
        </div>
      </div>
    </div>
  )
}

export default ProductThumbnail
