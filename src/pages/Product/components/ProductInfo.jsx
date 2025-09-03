"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { enqueueSnackbar } from "notistack"
import { addToCart, setCartChanged } from "../../Cart/cartSlice"
import cartsApi from "../../../api/cartApi"
import orderApi from "../../../api/ordersApi"
import userApi from "../../../api/userApi"
import { discountPercentage, formatPrice } from "../../../utils/common"
import axios from "axios"

// SVG Icons
const ChevronRightIcon = () => (
  <svg
    style={{ width: "16px", height: "16px", margin: "0 8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

const ShoppingCartIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const HeartIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const TruckIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

const RefreshIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

const ShieldIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
)

const PackageIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const PhoneIcon = () => (
  <svg
    style={{ width: "20px", height: "20px", marginRight: "8px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const ZoomInIcon = () => (
  <svg
    style={{ width: "20px", height: "20px" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
)

// Render star rating
const renderRating = (rating) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          style={{
            width: "16px",
            height: "16px",
            color: i < fullStars ? "#FACC15" : i === fullStars && hasHalfStar ? "#FACC15" : "#D1D5DB",
            marginRight: "2px",
          }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Badge component
const Badge = ({ children, variant }) => {
  const styles = {
    container: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      backgroundColor: variant === "green" ? "#ECFDF5" : "#F3F4F6",
      color: variant === "green" ? "#065F46" : "#374151",
      border: variant === "outline" ? "1px solid #E5E7EB" : "none",
    },
  }

  return <span style={styles.container}>{children}</span>
}

// Button component
const StyledButton = ({ children, variant, onClick, disabled, fullWidth, icon }) => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
  }

  const variants = {
    primary: {
      backgroundColor: "#1e3a8a",
      color: "#fff",
      border: "none",
      ":hover": {
        backgroundColor: "#1e40af",
      },
    },
    outline: {
      backgroundColor: "#fff",
      color: "#1e3a8a",
      border: "2px solid #1e3a8a",
      ":hover": {
        backgroundColor: "#f1f5f9",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#6B7280",
      border: "none",
      padding: "8px 12px",
      ":hover": {
        backgroundColor: "#F3F4F6",
      },
    },
  }

  const style = {
    ...baseStyles,
    ...variants[variant],
  }

  return (
    <button style={style} onClick={onClick} disabled={disabled}>
      {icon}
      {children}
    </button>
  )
}

// Modal component
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "24px",
      width: "400px",
      maxWidth: "90%",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    },
    header: {
      marginBottom: "16px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
    },
    content: {
      marginBottom: "24px",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
        </div>
        <div style={styles.content}>{children}</div>
        <div style={styles.footer}>{footer}</div>
      </div>
    </div>
  )
}

// Card component
const Card = ({ children, style }) => {
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    padding: "16px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    ...style,
  }

  return <div style={cardStyle}>{children}</div>
}

// Separator component
const Separator = () => {
  return <div style={{ height: "1px", backgroundColor: "#E5E7EB", margin: "16px 0" }} />
}

// Image Modal for zoom
const ImageModal = ({ isOpen, onClose, imageSrc, productName }) => {
  if (!isOpen) return null

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      padding: "20px",
    },
    modal: {
      maxWidth: "90vw",
      maxHeight: "90vh",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "8px",
    },
    closeButton: {
      position: "absolute",
      top: "-40px",
      right: "0",
      background: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "bold",
    },
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img src={imageSrc || "/placeholder.svg"} alt={productName} style={styles.image} />
      </div>
    </div>
  )
}

function ProductInfo({ product = {} }) {
  const { name, description, descriptionFull, salePrice, originalPrice, _id, image, rating, quantity } = product

  const brand = product.brand || ""
  const category = product.category || ""
  const reviewCount = product.reviewCount || 277

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/product/${product._id}`)
        console.log("Reviews:", res.data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }
  }, [])

  const userId = localStorage.getItem("userId")
  const promotionPercent = discountPercentage(originalPrice, salePrice)
  const [openModal, setOpenModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState([])
  const [error, setError] = useState("")

  const [selectedImage, setSelectedImage] = useState(image || "")

  useEffect(() => {
    if (!userId) {
      setError("No user ID found in local storage")
      return
    }
    ;(async () => {
      try {
        const info = await userApi.getInfo(userId)
        setUserInfo(info)
      } catch (error) {
        setError("Failed to fetch account info")
      }
    })()
  }, [userId])

  useEffect(() => {
    if (image) {
      setSelectedImage(image)
    }
  }, [image])

  const productId = _id ? _id.toString() : ""
  const payloadQuantity = 1
  const payload = {
    userId,
    productId,
    quantity: payloadQuantity,
  }

  const handleAddToCart = async () => {
    if (!userId) {
      setOpenModal(true)
      return
    }

    setIsLoading(true)
    try {
      await cartsApi.add(payload)
      dispatch(
        addToCart({
          id: product._id,
          product,
          quantity: 1,
        }),
      )
      dispatch(setCartChanged(true))
      enqueueSnackbar("Đã thêm vào giỏ hàng", { variant: "success" })
    } catch (error) {
      console.error("Add to cart failed:", error)
      enqueueSnackbar("Đã xảy ra lỗi!", { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const price = salePrice
  const urlImage = selectedImage
  const products = [
    {
      productId,
      price,
      quantity: payloadQuantity,
      urlImage,
    },
  ]

  const shippingInfo = {
    receiver: userInfo.displayName,
    phone: userInfo.contactPhone,
    address: userInfo.address,
    addressDetail: userInfo.addressDetail,
    isInCart: false,
  }

  const payloadPay = { userId, products, shippingInfo }

  const handleBuyNow = async () => {
    if (!userId) {
      setOpenModal(true)
      return
    }

    if (!shippingInfo.receiver || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.addressDetail) {
      if (window.confirm("Thông tin giao hàng chưa đầy đủ. Nhấn OK để cập nhật thông tin.")) {
        navigate("/account")
      }
      return
    }

    setIsLoading(true)
    try {
      const req = await orderApi.add(payloadPay)
      navigate(`/orders?id=${req.orderExist._id}`)
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi! Vui lòng thử lại sau.", { variant: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleNavigate = () => {
    navigate("/login")
  }

  const handleImageZoom = () => {
    setImageModal(true)
  }

  const defaultImage = "/placeholder.svg?height=600&width=600"

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "16px",
      fontFamily: "Helvetica, Arial, sans-serif",
    },
    breadcrumb: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      fontSize: "14px",
      color: "#6B7280",
    },
    breadcrumbLink: {
      textDecoration: "none",
      color: "#6B7280",
      marginRight: "8px",
      transition: "color 0.2s",
    },
    productContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "32px",
      flexWrap: "wrap",
    },
    gallery: {
      flex: "1 1 500px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minWidth: "400px",
    },
    mainImageContainer: {
      position: "relative",
      width: "100%",
      height: "500px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      overflow: "hidden",
      cursor: "zoom-in",
      transition: "all 0.3s ease",
    },
    mainImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "20px",
      transition: "transform 0.3s ease",
    },
    zoomButton: {
      position: "absolute",
      top: "16px",
      right: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
    },
    info: {
      flex: "1 1 400px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minWidth: "350px",
    },
    categoryRating: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      fontSize: "14px",
      color: "#6B7280",
      flexWrap: "wrap",
    },
    badgeContainer: {
      display: "flex",
      gap: "8px",
    },
    productName: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#111827",
      marginTop: "8px",
      marginBottom: "8px",
      lineHeight: "1.2",
    },
    priceContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
    },
    salePrice: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1e3a8a",
    },
    originalPrice: {
      fontSize: "18px",
      textDecoration: "line-through",
      color: "#6B7280",
    },
    stockInfo: {
      fontSize: "14px",
      fontWeight: "500",
    },
    inStock: {
      color: "#059669",
    },
    outOfStock: {
      color: "#DC2626",
    },
    actions: {
      display: "flex",
      gap: "12px",
      marginTop: "16px",
      flexWrap: "wrap",
    },
    benefitsCard: {
      backgroundColor: "#F8FAFC",
      marginTop: "24px",
    },
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    },
    benefitItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
    benefitText: {
      display: "flex",
      flexDirection: "column",
    },
    benefitTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#111827",
    },
    benefitDescription: {
      fontSize: "12px",
      color: "#6B7280",
    },
    descriptionSection: {
      marginTop: "24px",
    },
    descriptionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
    },
    descriptionText: {
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#4B5563",
    },
    descriptionText2: {
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#4B5563",
      fontWeight: "bold",
    },
    "@media (max-width: 768px)": {
      productContainer: {
        flexDirection: "column",
      },
      gallery: {
        minWidth: "auto",
      },
      mainImageContainer: {
        height: "350px",
      },
      info: {
        minWidth: "auto",
      },
      productName: {
        fontSize: "24px",
      },
      salePrice: {
        fontSize: "24px",
      },
    },
  }

  return (
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <a href="#" style={styles.breadcrumbLink}>
          Trang chủ
        </a>
        <ChevronRightIcon />
        <a href="#" style={styles.breadcrumbLink}>
          {brand}
        </a>
        <ChevronRightIcon />
        <a href="#" style={styles.breadcrumbLink}>
          {category}
        </a>
        <ChevronRightIcon />
        <span style={{ color: "#111827", fontWeight: "500" }}>{name}</span>
      </div>

      {/* Product Container */}
      <div style={styles.productContainer}>

        {/* Product Info */}
        <div style={styles.info}>
          {/* Badges */}
          <div style={styles.badgeContainer}>
            <Badge variant="outline">{brand}</Badge>
            <Badge variant="outline">{category}</Badge>
          </div>

          {/* Product Name */}
          <h1 style={styles.productName}>{name}</h1>

          {/* Rating */}
          <div style={styles.categoryRating}>
            {renderRating(rating)}
            <span style={{ marginLeft: "8px" }}>({reviewCount} đánh giá)</span>
          </div>

          {/* Price */}
          <div style={styles.priceContainer}>
            <span style={styles.salePrice}>{formatPrice(salePrice)}</span>
            {promotionPercent > 0 && (
              <>
                <span style={styles.originalPrice}>{formatPrice(originalPrice)}</span>
                <Badge variant="green">-{promotionPercent}%</Badge>
              </>
            )}
          </div>

          <Separator />

          {/* Stock Status */}
          <div
            style={
              quantity > 0 ? { ...styles.stockInfo, ...styles.inStock } : { ...styles.stockInfo, ...styles.outOfStock }
            }
          >
            {quantity > 0 ? `Còn ${quantity} sản phẩm` : "Hết hàng"}
          </div>

          {/* Actions */}
          <div style={styles.actions}>
            <StyledButton
              variant="primary"
              onClick={handleAddToCart}
              disabled={isLoading || quantity === 0}
              fullWidth
              icon={<ShoppingCartIcon />}
            >
              {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </StyledButton>
            <StyledButton variant="outline" onClick={handleBuyNow} disabled={isLoading || quantity === 0} fullWidth>
              {isLoading ? "Đang xử lý..." : "Mua ngay"}
            </StyledButton>
          </div>

          {/* Benefits */}
          <Card style={styles.benefitsCard}>
            <div style={styles.benefitsGrid}>
              <div style={styles.benefitItem}>
                <TruckIcon />
                <div style={styles.benefitText}>
                  <span style={styles.benefitTitle}>Miễn phí vận chuyển</span>
                  <span style={styles.benefitDescription}>Đơn hàng từ 500.000đ</span>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <RefreshIcon />
                <div style={styles.benefitText}>
                  <span style={styles.benefitTitle}>Đổi trả dễ dàng</span>
                  <span style={styles.benefitDescription}>Trong vòng 30 ngày</span>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <ShieldIcon />
                <div style={styles.benefitText}>
                  <span style={styles.benefitTitle}>Bảo hành chính hãng</span>
                  <span style={styles.benefitDescription}>Theo quy định nhà sản xuất</span>
                </div>
              </div>
              <div style={styles.benefitItem}>
                <PhoneIcon />
                <div style={styles.benefitText}>
                  <span style={styles.benefitTitle}>Hỗ trợ 24/7</span>
                  <span style={styles.benefitDescription}>Tư vấn miễn phí</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          {description && (
            <div style={styles.descriptionSection}>
              <h3 style={styles.descriptionTitle}>Mô tả sản phẩm</h3>
              <p style={styles.descriptionText}>{description}</p>
            </div>
          )}

          {descriptionFull && (
            <div style={styles.descriptionSection}>
              <h3 style={styles.descriptionTitle}>Thông tin chi tiết</h3>
              <p style={styles.descriptionText2}>{descriptionFull}</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        title="Yêu cầu đăng nhập"
        footer={
          <>
            <StyledButton variant="ghost" onClick={handleCloseModal}>
              Hủy
            </StyledButton>
            <StyledButton variant="primary" onClick={handleNavigate}>
              Đăng nhập
            </StyledButton>
          </>
        }
      >
        <p>Bạn cần đăng nhập để thực hiện chức năng này.</p>
      </Modal>

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModal}
        onClose={() => setImageModal(false)}
        imageSrc={selectedImage}
        productName={name}
      />
    </div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.object,
}

export default ProductInfo
