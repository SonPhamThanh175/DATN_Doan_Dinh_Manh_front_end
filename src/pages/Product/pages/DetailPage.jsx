"use client"

import { useState } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { Row, Col, Card, Spin, Breadcrumb, Space, notification } from "antd"
import {
  HomeOutlined,
  AppstoreOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import axios from "axios"

import ProductAdditional from "../components/ProductAdditional"
import ProductDescription from "../components/ProductDescription"
import ProductInfo from "../components/ProductInfo"
import ProductMenu from "../components/ProductMenu"
import ProductReviews from "../components/ProductReviews"
import ProductThumnail from "../components/ProductThumnail"
import useProductDetail from "../hooks/useProductDetail"
// import SuggestedProducts from "../components/SuggestedProducts"
// import RecommendedProducts from "../components/RecommendedProducts/RecommendedProducts"
import "./detail-page-style.css"

function DetailPage() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState([])
  const userId = localStorage.getItem("userId")
  const { product, loading } = useProductDetail(productId)

  // Hiển thị loading khi đang tải
  if (loading) {
    return (
      <div className="detail-page-loading">
        <div className="loading-container">
          <Spin size="large" />
          <div className="loading-text">Đang tải thông tin văn phòng phẩm...</div>
        </div>
      </div>
    )
  }

  const handleAddReview = async (newReview) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/reviews", {
        ...newReview,
        userId,
        productId,
      })
      setReviews([...reviews, data])
      notification.success({
        message: "Thành công",
        description: "Đánh giá của bạn đã được gửi thành công!",
      })
    } catch (error) {
      console.error("Error adding review:", error)
      notification.error({
        message: "Lỗi",
        description: "Không thể gửi đánh giá. Vui lòng thử lại sau.",
      })
    }
  }

  return (
    <div className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <Space>
                    <HomeOutlined />
                    <span>Trang chủ</span>
                  </Space>
                ),
              },
              {
                href: "/products",
                title: (
                  <Space>
                    <AppstoreOutlined />
                    <span>Văn phòng phẩm</span>
                  </Space>
                ),
              },
              {
                title: (
                  <Space>
                    <EyeOutlined />
                    <span>{product?.name || "Chi tiết sản phẩm"}</span>
                  </Space>
                ),
              },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <Card className="main-product-card">
          <Row gutter={[32, 32]}>
            {/* Product Thumbnail */}
            <Col xs={24} md={10}>
              <div className="product-thumbnail-section">
                <ProductThumnail product={product} />
              </div>
            </Col>

            {/* Product Info */}
            <Col xs={24} md={14}>
              <div className="product-info-section">
                <ProductInfo product={product} />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Product Stats */}
        <Card className="product-stats-card">
          <Row gutter={[24, 24]} className="stats-row">
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <EyeOutlined />
                </div>
                <div className="stat-content">
                  <div className="stat-number">1,234</div>
                  <div className="stat-label">Lượt xem</div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <ShoppingCartOutlined />
                </div>
                <div className="stat-content">
                  <div className="stat-number">89</div>
                  <div className="stat-label">Đã bán</div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <StarOutlined />
                </div>
                <div className="stat-content">
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">Đánh giá</div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <InfoCircleOutlined />
                </div>
                <div className="stat-content">
                  <div className="stat-number">24h</div>
                  <div className="stat-label">Giao hàng</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Suggested Products */}
        {/* <Card className="suggested-products-card">
          <div className="section-header">
            <h3 className="section-title">Sản phẩm tương tự</h3>
            <p className="section-subtitle">Những sản phẩm khác bạn có thể quan tâm</p>
          </div>
          <SuggestedProducts productId={productId} />
        </Card> */}

        {/* Recommended Products */}
        {/* <Card className="recommended-products-card">
          <div className="section-header">
            <h3 className="section-title">Sản phẩm được đề xuất</h3>
            <p className="section-subtitle">Dựa trên lịch sử mua hàng của bạn</p>
          </div>
          <RecommendedProducts />
        </Card> */}

        {/* Product Menu & Details */}
        <div className="product-details-section">
          <Card className="product-menu-card">
            <ProductMenu />
          </Card>

          <div className="product-content">
            <Routes>
              <Route path="" element={<ProductDescription product={product} />} />
              <Route path="additional" element={<ProductAdditional product={product} />} />
              <Route path="reviews" element={<ProductReviews onSubmitReview={handleAddReview} />} />
            </Routes>
          </div>
        </div>

        {/* Trust Badges */}
        <Card className="trust-badges-card">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">
                <ShoppingCartOutlined />
              </div>
              <div className="badge-content">
                <div className="badge-title">Miễn phí giao hàng</div>
                <div className="badge-subtitle">Đơn hàng từ 300.000đ</div>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">
                <StarOutlined />
              </div>
              <div className="badge-content">
                <div className="badge-title">Văn phòng phẩm chính hãng</div>
                <div className="badge-subtitle">100% sản phẩm chất lượng cao</div>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">
                <InfoCircleOutlined />
              </div>
              <div className="badge-content">
                <div className="badge-title">Hỗ trợ doanh nghiệp</div>
                <div className="badge-subtitle">Tư vấn giải pháp văn phòng</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DetailPage
