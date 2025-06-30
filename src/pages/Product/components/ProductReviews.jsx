"use client"

import { useEffect, useState } from "react"
import { Rate, Button, Form, Input, List, Typography, Card, Space, Avatar, Empty, Spin, Alert } from "antd"
import {
  StarOutlined,
  UserOutlined,
  MessageOutlined,
  SendOutlined,
  CalendarOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./product-reviews-style.css"

const { TextArea } = Input
const { Title, Text, Paragraph } = Typography

function ProductReviews({ onSubmitReview }) {
  const [form] = Form.useForm()
  const [rating, setRating] = useState(0)
  const { productId } = useParams()
  const [reviews, setReviews] = useState([])
  const [authors, setAuthors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchReviews = async () => {
      if (productId) {
        try {
          setLoading(true)
          setError(null)
          const response = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`)
          const reviewsData = Array.isArray(response.data.reviews) ? response.data.reviews : []
          setReviews(reviewsData)

          // Fetch tác giả sau khi đã có đánh giá
          if (reviewsData.length > 0) {
            const authorPromises = reviewsData.map((review) =>
              axios
                .get(`http://localhost:5000/api/auth/${review.userId}`)
                .then((res) => ({ [review.userId]: res.data }))
                .catch(() => ({ [review.userId]: { displayName: "Người dùng ẩn danh" } })),
            )
            const authorsData = await Promise.all(authorPromises)
            const authorsMap = authorsData.reduce((acc, author) => ({ ...acc, ...author }), {})
            setAuthors(authorsMap)
          }
        } catch (error) {
          console.error("Error fetching reviews:", error)
          setError("Không thể tải đánh giá sản phẩm")
        } finally {
          setLoading(false)
        }
      }
    }

    fetchReviews()
  }, [productId])

  const handleFinish = async (values) => {
    const newReview = {
      rate: rating,
      comment: values.comment,
      userId,
      productId,
    }

    try {
      setSubmitting(true)
      await onSubmitReview(newReview)
      form.resetFields()
      setRating(0)
      // Refresh reviews after successful submission
      const response = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`)
      setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : [])
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // Calculate average rating
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length : 0

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rate === star).length,
    percentage:
      reviews.length > 0 ? (reviews.filter((review) => review.rate === star).length / reviews.length) * 100 : 0,
  }))

  if (loading) {
    return (
      <Card className="reviews-card">
        <div className="loading-container">
          <Spin size="large" />
          <Text>Đang tải đánh giá...</Text>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="reviews-card">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    )
  }

  return (
    <div className="product-reviews">
      {/* Reviews Overview */}
      <Card className="reviews-overview-card">
        <div className="overview-header">
          <Title level={3} className="reviews-title">
            <MessageOutlined /> Đánh giá sản phẩm
          </Title>
          <Text className="reviews-subtitle">Chia sẻ trải nghiệm của bạn về sản phẩm này</Text>
        </div>

        <div className="rating-summary">
          <div className="average-rating">
            <div className="rating-score">{averageRating.toFixed(1)}</div>
            <Rate disabled value={averageRating} allowHalf className="rating-stars" />
            <Text className="rating-count">({reviews.length} đánh giá)</Text>
          </div>

          <div className="rating-distribution">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="rating-bar">
                <Text className="star-label">{star} sao</Text>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
                <Text className="count-label">({count})</Text>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Write Review Form */}
      <Card className="write-review-card">
        <div className="form-header">
          <Title level={4} className="form-title">
            <StarOutlined /> Viết đánh giá của bạn
          </Title>
          <Text className="form-subtitle">Đánh giá của bạn sẽ giúp khách hàng khác có thêm thông tin tham khảo</Text>
        </div>

        <Form form={form} onFinish={handleFinish} layout="vertical" className="review-form">
          <Form.Item label="Đánh giá của bạn" name="rating" className="rating-form-item">
            <div className="rating-input">
              <Rate onChange={setRating} value={rating} className="rating-input-stars" />
              <Text className="rating-text">
                {rating === 0 && "Chọn số sao"}
                {rating === 1 && "Rất không hài lòng"}
                {rating === 2 && "Không hài lòng"}
                {rating === 3 && "Bình thường"}
                {rating === 4 && "Hài lòng"}
                {rating === 5 && "Rất hài lòng"}
              </Text>
            </div>
          </Form.Item>

          <Form.Item
            label="Nhận xét chi tiết"
            name="comment"
            rules={[
              { required: true, message: "Vui lòng nhập nhận xét của bạn!" },
              { min: 10, message: "Nhận xét phải có ít nhất 10 ký tự!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              showCount
              maxLength={500}
              className="comment-textarea"
            />
          </Form.Item>

          <Form.Item className="submit-form-item">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={rating === 0}
              icon={<SendOutlined />}
              size="large"
              className="submit-button"
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Reviews List */}
      <Card className="reviews-list-card">
        <div className="list-header">
          <Title level={4} className="list-title">
            Tất cả đánh giá ({reviews.length})
          </Title>
        </div>

        {reviews.length === 0 ? (
          <Empty
            image={<MessageOutlined className="empty-icon" />}
            description={
              <div className="empty-description">
                <Text>Chưa có đánh giá nào cho sản phẩm này</Text>
                <br />
                <Text type="secondary">Hãy là người đầu tiên đánh giá sản phẩm!</Text>
              </div>
            }
          />
        ) : (
          <List
            className="reviews-list"
            itemLayout="vertical"
            dataSource={reviews}
            renderItem={(review, index) => (
              <List.Item key={review.id || index} className="review-item">
                <div className="review-content">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <Avatar size={40} icon={<UserOutlined />} className="reviewer-avatar" />
                      <div className="reviewer-details">
                        <Text strong className="reviewer-name">
                          {authors[review.userId]?.displayName || "Người dùng ẩn danh"}
                        </Text>
                        <div className="review-meta">
                          <Rate disabled value={review.rate} size="small" className="review-rating" />
                          <Text className="review-date">
                            <CalendarOutlined /> {new Date(review.date || Date.now()).toLocaleDateString("vi-VN")}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="review-body">
                    <Paragraph className="review-comment">{review.comment}</Paragraph>
                  </div>

                  <div className="review-actions">
                    <Space>
                      <Button type="text" size="small" icon={<LikeOutlined />} className="action-button">
                        Hữu ích (0)
                      </Button>
                      <Button type="text" size="small" icon={<DislikeOutlined />} className="action-button">
                        Không hữu ích (0)
                      </Button>
                    </Space>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  )
}

export default ProductReviews
