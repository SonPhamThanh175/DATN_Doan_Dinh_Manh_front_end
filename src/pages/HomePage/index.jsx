import { useState, useEffect } from "react"
import {
  Building2,
  Package,
  FileText,
  Calculator,
  Truck,
  Shield,
  Clock,
  Users,
  Star,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ShoppingCart,
  Search,
  ArrowRight,
} from "lucide-react"
import "./home-style.css"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Giải Pháp Văn Phòng Phẩm Toàn Diện",
      subtitle: "Khám phá hàng ngàn sản phẩm chất lượng cao cho mọi nhu cầu văn phòng",
      image: "https://huce.edu.vn/images57/portal-1/Gi%E1%BB%9Bi%20thi%E1%BB%87u/HUCE.jpg",
    },
    {
      title: "Thiết Bị Văn Phòng Hiện Đại",
      subtitle: "Máy tính, máy in, máy photocopy và các thiết bị công nghệ tiên tiến",
      image: "https://huce.edu.vn/images57/portal-1/Tin%20t%E1%BB%A9c/Ho%E1%BA%A1t%20%C4%91%E1%BB%99ng%20chung/2022/T11/xay-dung-a2-1662871290911.jpg",
    },
    {
      title: "Dụng Cụ Học Tập Chất Lượng",
      subtitle: "Phục vụ học sinh, sinh viên với đầy đủ dụng cụ học tập cần thiết",
      image: "https://huce.edu.vn/images57/portal-1/Tin%20t%E1%BB%A9c/Ho%E1%BA%A1t%20%C4%91%E1%BB%99ng%20chung/2022/T11/xay-dung-a6-1662871291192.jpg",
    },
  ]

  const categories = [
    {
      icon: <FileText size={48} />,
      title: "Văn Phòng Phẩm",
      description: "Bút viết, giấy in, file tài liệu",
      products: "500+ sản phẩm",
    },
    {
      icon: <Calculator size={48} />,
      title: "Thiết Bị Văn Phòng",
      description: "Máy tính, máy in, máy photocopy",
      products: "200+ sản phẩm",
    },
    {
      icon: <Package size={48} />,
      title: "Dụng Cụ Học Tập",
      description: "Sách vở, bút chì, thước kẻ",
      products: "800+ sản phẩm",
    },
    {
      icon: <Building2 size={48} />,
      title: "Nội Thất Văn Phòng",
      description: "Bàn ghế, tủ tài liệu, kệ sách",
      products: "150+ sản phẩm",
    },
  ]

  const features = [
    {
      icon: <Truck size={32} />,
      title: "Giao Hàng Nhanh",
      description: "Giao hàng trong 24h tại Hà Nội và các tỉnh lân cận",
    },
    {
      icon: <Shield size={32} />,
      title: "Chất Lượng Đảm Bảo",
      description: "Cam kết 100% hàng chính hãng, bảo hành đầy đủ",
    },
    {
      icon: <Clock size={32} />,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ",
    },
    {
      icon: <Users size={32} />,
      title: "Khách Hàng Tin Tưởng",
      description: "Phục vụ hơn 10,000+ khách hàng trên toàn quốc",
    },
  ]

  const testimonials = [
    {
      name: "Nguyễn Văn An",
      position: "Giám đốc Công ty ABC",
      content:
        "HUCE đã cung cấp đầy đủ văn phòng phẩm cho công ty chúng tôi với chất lượng tuyệt vời và giá cả hợp lý.",
      rating: 5,
    },
    {
      name: "Trần Thị Bình",
      position: "Hiệu trưởng Trường XYZ",
      content: "Dịch vụ chuyên nghiệp, giao hàng đúng hẹn. Chúng tôi rất hài lòng với HUCE.",
      rating: 5,
    },
    {
      name: "Lê Minh Cường",
      position: "Chủ cửa hàng",
      content: "Sản phẩm đa dạng, chất lượng tốt. HUCE là đối tác tin cậy của chúng tôi.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="homepage">
      {/* Header
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Building2 size={32} />
              <span>HUCE</span>
            </div>

            <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
              <a href="#home">Trang Chủ</a>
              <a href="#products">Sản Phẩm</a>
              <a href="#about">Giới Thiệu</a>
              <a href="#services">Dịch Vụ</a>
              <a href="#contact">Liên Hệ</a>
            </nav>

            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <Search size={20} />
              </div>
              <button className="cart-btn">
                <ShoppingCart size={24} />
                <span className="cart-count">0</span>
              </button>
              <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`hero-slide ${index === currentSlide ? "active" : ""}`}>
              <div className="hero-background">
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
                <div className="hero-overlay"></div>
              </div>
              <div className="container">
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <div className="hero-buttons">
                    <button className="btn btn-primary">
                      Khám Phá Ngay <ArrowRight size={20} />
                    </button>
                    <button className="btn btn-outline">Liên Hệ Tư Vấn</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Danh Mục Sản Phẩm</h2>
            <p>Khám phá các danh mục sản phẩm đa dạng của HUCE</p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="product-count">{category.products}</span>
                <button className="category-btn">
                  Xem Thêm <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Về HUCE</h2>
              <p className="about-subtitle">Đối tác tin cậy trong việc cung cấp văn phòng phẩm chất lượng cao</p>
              <p>
                Với hơn 10 năm kinh nghiệm trong lĩnh vực văn phòng phẩm, HUCE tự hào là một trong những nhà cung cấp
                hàng đầu tại Việt Nam. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất với giá
                cả hợp lý nhất.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>10,000+</h3>
                  <p>Khách hàng tin tưởng</p>
                </div>
                <div className="stat">
                  <h3>1,500+</h3>
                  <p>Sản phẩm đa dạng</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Thương hiệu uy tín</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://huce.edu.vn/images57/portal-1/Gi%E1%BB%9Bi%20thi%E1%BB%87u/HUCE.jpg" alt="Về HUCE" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="services">
        <div className="container">
          <div className="section-header">
            <h2>Tại Sao Chọn HUCE?</h2>
            <p>Những ưu điểm vượt trội khi mua sắm tại HUCE</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Khách Hàng Nói Gì Về HUCE</h2>
            <p>Những phản hồi tích cực từ khách hàng của chúng tôi</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p>"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn Sàng Bắt Đầu Mua Sắm?</h2>
            <p>Khám phá hàng ngàn sản phẩm văn phòng phẩm chất lượng cao tại HUCE</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Mua Sắm Ngay</button>
              <button className="btn btn-outline">Tư Vấn Miễn Phí</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <Building2 size={32} />
                <span>HUCE</span>
              </div>
              <p>
                Đối tác tin cậy trong việc cung cấp văn phòng phẩm chất lượng cao cho doanh nghiệp và cá nhân trên toàn
                quốc.
              </p>
              <div className="social-links">
                <a href="#">
                  <Facebook size={24} />
                </a>
                <a href="#">
                  <Instagram size={24} />
                </a>
                <a href="#">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Sản Phẩm</h3>
              <ul>
                <li>
                  <a href="#">Văn Phòng Phẩm</a>
                </li>
                <li>
                  <a href="#">Thiết Bị Văn Phòng</a>
                </li>
                <li>
                  <a href="#">Dụng Cụ Học Tập</a>
                </li>
                <li>
                  <a href="#">Nội Thất Văn Phòng</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Dịch Vụ</h3>
              <ul>
                <li>
                  <a href="#">Tư Vấn Miễn Phí</a>
                </li>
                <li>
                  <a href="#">Giao Hàng Nhanh</a>
                </li>
                <li>
                  <a href="#">Bảo Hành Sản Phẩm</a>
                </li>
                <li>
                  <a href="#">Hỗ Trợ Kỹ Thuật</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Liên Hệ</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>123 Đường ABC, Quận XYZ, Hà Nội</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>0123 456 789</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>info@huce.vn</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 HUCE. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
