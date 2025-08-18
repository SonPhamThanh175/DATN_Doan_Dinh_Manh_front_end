"use client"

import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import { Row, Col, Pagination, Typography, Breadcrumb, Card, Space, Spin, Alert, Button } from "antd"
import {
  HomeOutlined,
  AppstoreOutlined,
  FilterOutlined,
  ShoppingOutlined,
  TruckOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons"

import productsApi from "../../../api/productApi"
import ProductFilter from "../components/ProductFilter"
import ProductList from "../components/ProductList"
import ProductSort from "../components/ProductSort"
import ProductClear from "../components/ProductClear"
import MenuItemLeft from "../../Product/components/ProductMenu"
import "./list-page-style.css"

const { Title, Text, Paragraph } = Typography

function ListPage(props) {
  const [productList, setProductList] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 16,
      _sort: params._sort || "asc",
    }
  }, [location.search])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productsApi.getAll(queryParams)
        setProductList(data.rows)
        setTotalProducts(data.totalProducts)
      } catch (error) {
        console.log("Failed to get all products:", error)
        setError("Không thể tải danh sách sản phẩm")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [queryParams])

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleCategoryChange = (menuData) => {
    const filters = {
      ...queryParams,
    }

    // Clear previous selections
    delete filters.menuId
    delete filters.categoryId
    delete filters.typeId

    // Set new selection based on field type
    if (menuData.field === "categoryId") {
      filters.categoryId = menuData.id
    } else if (menuData.field === "typeId") {
      filters.typeId = menuData.id
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const features = [
    {
      icon: <TruckOutlined />,
      title: "Giao hàng nhanh",
      description: "Giao hàng trong 24h",
    },
    {
      icon: <SafetyOutlined />,
      title: "Chất lượng đảm bảo",
      description: "100% hàng chính hãng",
    },
    {
      icon: <CustomerServiceOutlined />,
      title: "Hỗ trợ 24/7",
      description: "Tư vấn chuyên nghiệp",
    },
    {
      icon: <ShoppingOutlined />,
      title: "Đổi trả dễ dàng",
      description: "Đổi trả trong 7 ngày",
    },
  ]

  return (
    <div className="list-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="container">
            <Title level={1} className="hero-title">
              Văn Phòng Phẩm HUCE
            </Title>
            <Paragraph className="hero-subtitle">
              Khám phá hàng ngàn sản phẩm văn phòng phẩm chất lượng cao với giá cả hợp lý nhất
            </Paragraph>
            <Space size="large" className="hero-stats">
              <div className="stat-item">
                <Text strong className="stat-number">
                  1,500+
                </Text>
                <Text className="stat-label">Sản phẩm</Text>
              </div>
              <div className="stat-item">
                <Text strong className="stat-number">
                  10,000+
                </Text>
                <Text className="stat-label">Khách hàng</Text>
              </div>
              <div className="stat-item">
                <Text strong className="stat-number">
                  50+
                </Text>
                <Text className="stat-label">Thương hiệu</Text>
              </div>
            </Space>
          </div>
        </div>
      </div>

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
                    <span>Sản phẩm</span>
                  </Space>
                ),
              },
            ]}
          />
        </div>

        {/* Main Content */}
        <Row gutter={[24, 24]} className="main-content">
          {/* Sidebar - Filters */}
          <Col xs={24} lg={6}>
            <div className="sidebar">
              <Card className="filter-card">
                <div className="filter-header">
                  <Title level={4}>
                    <FilterOutlined /> Bộ lọc sản phẩm
                  </Title>
                </div>
                <ProductFilter filters={queryParams} onChange={handleFiltersChange} />
              </Card>

              {/* <Card className="category-card">
                <div className="category-header">
                  <Title level={4}>
                    <AppstoreOutlined /> Danh mục sản phẩm
                  </Title>
                </div>
                <MenuItemLeft onChange={handleCategoryChange} />
              </Card> */}
            </div>
          </Col>

          {/* Main Content - Products */}
          <Col xs={24} lg={18}>
            <div className="products-section">
              {/* Filter Viewer & Sort */}
              <Card className="controls-card">
                <div className="controls-header">
                  <div className="results-info">
                    <Text strong>
                      Hiển thị {productList.length} trong tổng số {totalProducts} sản phẩm
                    </Text>
                  </div>
                  <div className="controls-actions">
                    <Space>
                      {/* <FilterViewer filters={queryParams} onChange={handleFiltersChange} /> */}
                      <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                    </Space>
                  </div>
                </div>
              </Card>

              {/* Products Grid */}
              <div className="products-container">
                {loading ? (
                  <div className="loading-container">
                    <Spin size="large" />
                    <Text>Đang tải sản phẩm...</Text>
                  </div>
                ) : error ? (
                  <Alert message="Lỗi" description={error} type="error" showIcon />
                ) : productList && productList.length > 0 ? (
                  <>
                    <ProductList data={productList} />
                    <div className="pagination-container">
                      <Pagination
                        className="custom-pagination"
                        current={Number.parseInt(queryParams._page)}
                        total={totalProducts}
                        pageSize={queryParams._limit}
                        onChange={(page) => handleFiltersChange({ _page: page })}
                        showSizeChanger
                        showQuickJumper
                        showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`}
                        pageSizeOptions={["8", "16", "24", "32"]}
                        onShowSizeChange={(current, size) => handleFiltersChange({ _page: 1, _limit: size })}
                      />
                    </div>
                  </>
                ) : (
                  <ProductClear />
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <div className="features-section">
          <Card className="features-card">
            <Title level={3} className="features-title">
              Tại sao chọn HUCE?
            </Title>
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col key={index} xs={12} md={6}>
                  <div className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <Title level={5} className="feature-title">
                      {feature.title}
                    </Title>
                    <Text className="feature-description">{feature.description}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <Card className="cta-card">
            <div className="cta-content">
              <Title level={2} className="cta-title">
                Cần tư vấn sản phẩm?
              </Title>
              <Paragraph className="cta-description">
                Đội ngũ chuyên gia của HUCE luôn sẵn sàng hỗ trợ bạn tìm được sản phẩm phù hợp nhất
              </Paragraph>
              <Space size="large">
                <Button type="primary" size="large" className="cta-button">
                  Liên hệ tư vấn
                </Button>
                <Button size="large" className="cta-button-outline">
                  Xem catalog
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ListPage
