"use client"

import { useState } from "react"
import {
  Building2,
  Search,
  Calendar,
  User,
  Eye,
  MessageCircle,
  Tag,
  ChevronRight,
  Clock,
  TrendingUp,
  BookOpen,
  Share2,
  Heart,
  ArrowLeft,
  Grid,
  List,
} from "lucide-react"
import "./blog-style.css"

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [
    { id: "all", name: "Tất cả", count: 45 },
    { id: "tips", name: "Mẹo văn phòng", count: 12 },
    { id: "products", name: "Sản phẩm mới", count: 8 },
    { id: "trends", name: "Xu hướng", count: 10 },
    { id: "guides", name: "Hướng dẫn", count: 15 },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "10 Mẹo Tổ Chức Văn Phòng Hiệu Quả Cho Năm 2024",
      excerpt:
        "Khám phá những cách thức tổ chức không gian làm việc giúp tăng năng suất và tạo môi trường làm việc tích cực...",
      image: "/placeholder.svg?height=300&width=400",
      category: "tips",
      author: "Nguyễn Văn An",
      date: "2024-01-15",
      readTime: "5 phút đọc",
      views: 1250,
      comments: 23,
      tags: ["văn phòng", "tổ chức", "năng suất"],
      featured: true,
    },
    {
      id: 2,
      title: "Xu Hướng Thiết Kế Văn Phòng Hiện Đại 2024",
      excerpt:
        "Tìm hiểu về những xu hướng thiết kế văn phòng mới nhất, từ không gian mở đến văn phòng xanh và bền vững...",
      image: "/placeholder.svg?height=300&width=400",
      category: "trends",
      author: "Trần Thị Bình",
      date: "2024-01-12",
      readTime: "7 phút đọc",
      views: 980,
      comments: 15,
      tags: ["thiết kế", "xu hướng", "hiện đại"],
      featured: false,
    },
    {
      id: 3,
      title: "Hướng Dẫn Chọn Mua Máy In Phù Hợp Cho Văn Phòng Nhỏ",
      excerpt:
        "Những tiêu chí quan trọng khi lựa chọn máy in cho văn phòng nhỏ, từ chi phí vận hành đến tính năng cần thiết...",
      image: "/placeholder.svg?height=300&width=400",
      category: "guides",
      author: "Lê Minh Cường",
      date: "2024-01-10",
      readTime: "6 phút đọc",
      views: 1500,
      comments: 31,
      tags: ["máy in", "hướng dẫn", "văn phòng nhỏ"],
      featured: false,
    },
    {
      id: 4,
      title: "Ra Mắt Bộ Sưu Tập Văn Phóng Phẩm Eco-Friendly",
      excerpt:
        "HUCE giới thiệu dòng sản phẩm văn phòng phẩm thân thiện với môi trường, góp phần bảo vệ hành tinh xanh...",
      image: "/placeholder.svg?height=300&width=400",
      category: "products",
      author: "Phạm Thu Hà",
      date: "2024-01-08",
      readTime: "4 phút đọc",
      views: 750,
      comments: 18,
      tags: ["sản phẩm mới", "eco-friendly", "môi trường"],
      featured: true,
    },
    {
      id: 5,
      title: "Cách Tối Ưu Hóa Chi Phí Văn Phòng Phẩm Cho Doanh Nghiệp",
      excerpt:
        "Những chiến lược thông minh để giảm chi phí văn phòng phẩm mà vẫn đảm bảo chất lượng và hiệu quả công việc...",
      image: "/placeholder.svg?height=300&width=400",
      category: "tips",
      author: "Hoàng Văn Đức",
      date: "2024-01-05",
      readTime: "8 phút đọc",
      views: 1100,
      comments: 27,
      tags: ["tiết kiệm", "chi phí", "doanh nghiệp"],
      featured: false,
    },
    {
      id: 6,
      title: "Đánh Giá Chi Tiết: Top 5 Bút Bi Tốt Nhất 2024",
      excerpt:
        "So sánh và đánh giá chi tiết 5 loại bút bi được ưa chuộng nhất hiện nay về chất lượng, giá cả và trải nghiệm sử dụng...",
      image: "/placeholder.svg?height=300&width=400",
      category: "products",
      author: "Vũ Thị Mai",
      date: "2024-01-03",
      readTime: "10 phút đọc",
      views: 2100,
      comments: 45,
      tags: ["bút bi", "đánh giá", "so sánh"],
      featured: false,
    },
  ]

  const popularPosts = [
    {
      id: 1,
      title: "10 Mẹo Tổ Chức Văn Phòng Hiệu Quả",
      views: 1250,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Đánh Giá Chi Tiết: Top 5 Bút Bi Tốt Nhất",
      views: 2100,
      date: "2024-01-03",
    },
    {
      id: 3,
      title: "Hướng Dẫn Chọn Mua Máy In Phù Hợp",
      views: 1500,
      date: "2024-01-10",
    },
  ]

  const recentTags = [
    "văn phòng",
    "tổ chức",
    "năng suất",
    "thiết kế",
    "xu hướng",
    "máy in",
    "hướng dẫn",
    "eco-friendly",
    "tiết kiệm",
    "đánh giá",
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Building2 size={32} />
              <span>HUCE Blog</span>
            </div>
            <nav className="nav">
              <a href="/">Trang Chủ</a>
              <a href="/products">Sản Phẩm</a>
              <a href="/blog" className="active">
                Blog
              </a>
              <a href="/contact">Liên Hệ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Blog HUCE</h1>
            <p>Khám phá những kiến thức, mẹo hay và xu hướng mới nhất về văn phòng phẩm</p>
            <div className="hero-search">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-content">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <main className="blog-main">
              {/* Filter Bar */}
              <div className="filter-bar">
                <div className="filter-left">
                  <div className="category-filters">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                        <span className="count">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-right">
                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Posts */}
              {selectedCategory === "all" && (
                <section className="featured-section">
                  <h2>Bài viết nổi bật</h2>
                  <div className="featured-posts">
                    {blogPosts
                      .filter((post) => post.featured)
                      .map((post) => (
                        <article key={post.id} className="featured-post">
                          <div className="post-image">
                            <img src={post.image || "/placeholder.svg"} alt={post.title} />
                            <div className="post-category">
                              {categories.find((cat) => cat.id === post.category)?.name}
                            </div>
                          </div>
                          <div className="post-content">
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <div className="post-meta">
                              <div className="meta-left">
                                <span className="author">
                                  <User size={14} />
                                  {post.author}
                                </span>
                                <span className="date">
                                  <Calendar size={14} />
                                  {formatDate(post.date)}
                                </span>
                                <span className="read-time">
                                  <Clock size={14} />
                                  {post.readTime}
                                </span>
                              </div>
                              <div className="meta-right">
                                <span className="views">
                                  <Eye size={14} />
                                  {post.views}
                                </span>
                                <span className="comments">
                                  <MessageCircle size={14} />
                                  {post.comments}
                                </span>
                              </div>
                            </div>
                            <div className="post-tags">
                              {post.tags.map((tag) => (
                                <span key={tag} className="tag">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </section>
              )}

              {/* Blog Posts Grid/List */}
              <section className="posts-section">
                <div className="section-header">
                  <h2>
                    {selectedCategory === "all"
                      ? "Tất cả bài viết"
                      : categories.find((cat) => cat.id === selectedCategory)?.name}
                  </h2>
                  <span className="posts-count">{filteredPosts.length} bài viết</span>
                </div>

                <div className={`posts-grid ${viewMode}`}>
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="post-card">
                      <div className="post-image">
                        <img src={post.image || "/placeholder.svg"} alt={post.title} />
                        <div className="post-category">{categories.find((cat) => cat.id === post.category)?.name}</div>
                        {post.featured && <div className="featured-badge">Nổi bật</div>}
                      </div>
                      <div className="post-content">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="post-meta">
                          <div className="meta-row">
                            <span className="author">
                              <User size={14} />
                              {post.author}
                            </span>
                            <span className="date">
                              <Calendar size={14} />
                              {formatDate(post.date)}
                            </span>
                          </div>
                          <div className="meta-row">
                            <span className="read-time">
                              <Clock size={14} />
                              {post.readTime}
                            </span>
                            <div className="engagement">
                              <span className="views">
                                <Eye size={14} />
                                {post.views}
                              </span>
                              <span className="comments">
                                <MessageCircle size={14} />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="post-tags">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="post-actions">
                          <button className="read-more-btn">
                            Đọc tiếp <ChevronRight size={16} />
                          </button>
                          <div className="action-buttons">
                            <button className="action-btn">
                              <Heart size={16} />
                            </button>
                            <button className="action-btn">
                              <Share2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button className="page-btn" disabled>
                    <ArrowLeft size={16} />
                    Trước
                  </button>
                  <div className="page-numbers">
                    <button className="page-number active">1</button>
                    <button className="page-number">2</button>
                    <button className="page-number">3</button>
                    <span className="page-dots">...</span>
                    <button className="page-number">10</button>
                  </div>
                  <button className="page-btn">
                    Sau
                    <ChevronRight size={16} />
                  </button>
                </div>
              </section>
            </main>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Popular Posts */}
              <div className="sidebar-widget">
                <h3>
                  <TrendingUp size={20} />
                  Bài viết phổ biến
                </h3>
                <div className="popular-posts">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="popular-post">
                      <h4>{post.title}</h4>
                      <div className="post-stats">
                        <span className="views">
                          <Eye size={12} />
                          {post.views} lượt xem
                        </span>
                        <span className="date">{formatDate(post.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="sidebar-widget">
                <h3>
                  <BookOpen size={20} />
                  Danh mục
                </h3>
                <div className="category-list">
                  {categories
                    .filter((cat) => cat.id !== "all")
                    .map((category) => (
                      <div key={category.id} className="category-item">
                        <span className="category-name">{category.name}</span>
                        <span className="category-count">{category.count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tags */}
              <div className="sidebar-widget">
                <h3>
                  <Tag size={20} />
                  Thẻ phổ biến
                </h3>
                <div className="tags-cloud">
                  {recentTags.map((tag) => (
                    <span key={tag} className="tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget newsletter-widget">
                <h3>Đăng ký nhận tin</h3>
                <p>Nhận những bài viết mới nhất về văn phòng phẩm qua email</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Email của bạn" />
                  <button type="submit" className="subscribe-btn">
                    Đăng ký
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
export { BlogPage }
