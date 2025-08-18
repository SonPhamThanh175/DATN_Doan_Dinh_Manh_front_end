import "./cart-clear-style.css"

const CartClear = () => {
  return (
    <div className="cart-clear-container">
      <div className="cart-clear-content">
        <img src="/placeholder-9e3xe.png" alt="Giỏ hàng trống" className="empty-cart-image" />
        <h1 className="empty-cart-title">Giỏ hàng văn phòng phẩm của bạn đang trống</h1>
        <p className="empty-cart-description">
          Khám phá bộ sưu tập văn phòng phẩm chất lượng cao của HUCE để tìm những sản phẩm phù hợp với nhu cầu công việc
          của bạn.
        </p>
        <a href="/products" className="continue-shopping-btn">
          Khám phá văn phòng phẩm
        </a>

        {/* Suggested categories */}
        <div className="suggested-categories">
          <h3 className="categories-title">Danh mục phổ biến</h3>
          <div className="categories-grid">
            <a href="/products?category=stationery" className="category-item">
              <span className="category-icon">✏️</span>
              <span>Văn phòng phẩm</span>
            </a>
            <a href="/products?category=office-supplies" className="category-item">
              <span className="category-icon">📁</span>
              <span>Dụng cụ văn phòng</span>
            </a>
            <a href="/products?category=technology" className="category-item">
              <span className="category-icon">💻</span>
              <span>Thiết bị công nghệ</span>
            </a>
            <a href="/products?category=furniture" className="category-item">
              <span className="category-icon">🪑</span>
              <span>Nội thất văn phòng</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartClear
