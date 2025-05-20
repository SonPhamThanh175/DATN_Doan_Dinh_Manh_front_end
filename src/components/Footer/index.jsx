import { Layout, Row, Col, Typography, Space, Divider, Input, Button } from "antd"
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  AppleOutlined,
  AndroidOutlined,
} from "@ant-design/icons"

const { Footer } = Layout
const { Title, Text, Link } = Typography

const FooterComponent = () => {
  return (
    <Footer
      style={{
        background: "#1e3a8a",
        padding: "40px 50px 20px",
        color: "white",
      }}
    >
      <Row gutter={[32, 32]}>
        {/* Thông tin công ty */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <img src="/logo.png?height=50&width=50" alt="Logo" style={{ marginRight: 10, height:50,width:50 }} />
            <Title level={4} style={{ color: "white", margin: 0 }}>
              VĂN PHÒNG PHẨM
            </Title>
          </div>

          <Space direction="vertical" size="small" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <EnvironmentOutlined style={{ marginRight: 8, marginTop: 4 }} />
              <Text style={{ color: "white" }}>Số 123 đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PhoneOutlined style={{ marginRight: 8 }} />
              <Text style={{ color: "white" }}>(024) 38 123 456</Text>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MailOutlined style={{ marginRight: 8 }} />
              <Text style={{ color: "white" }}>info@vanphongpham.com.vn</Text>
            </div>
          </Space>

          <Title level={5} style={{ color: "white", marginTop: 20 }}>
            MẠNG XÃ HỘI
          </Title>
          <Space size="middle">
            <Link href="https://facebook.com" target="_blank">
              <FacebookOutlined style={{ fontSize: 24, color: "white" }} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <TwitterOutlined style={{ fontSize: 24, color: "white" }} />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <YoutubeOutlined style={{ fontSize: 24, color: "white" }} />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <InstagramOutlined style={{ fontSize: 24, color: "white" }} />
            </Link>
          </Space>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={5} style={{ color: "white" }}>
            SẢN PHẨM
          </Title>
          <Space direction="vertical" size="small">
            <Link style={{ color: "white" }} href="/products?category=office">
              Văn phòng phẩm
            </Link>
            <Link style={{ color: "white" }} href="/products?category=school">
              Dụng cụ học sinh
            </Link>
            <Link style={{ color: "white" }} href="/products?category=art">
              Dụng cụ mỹ thuật
            </Link>
            <Link style={{ color: "white" }} href="/products?category=paper">
              Giấy các loại
            </Link>
            <Link style={{ color: "white" }} href="/products?category=pen">
              Bút viết
            </Link>
            <Link style={{ color: "white" }} href="/products?category=notebook">
              Sổ - Tập
            </Link>
            <Link style={{ color: "white" }} href="/products?category=file">
              Lưu trữ hồ sơ
            </Link>
          </Space>
        </Col>

        {/* Thông tin hỗ trợ */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={5} style={{ color: "white" }}>
            HỖ TRỢ KHÁCH HÀNG
          </Title>
          <Space direction="vertical" size="small">
            <Link style={{ color: "white" }} href="/about">
              Giới thiệu
            </Link>
            <Link style={{ color: "white" }} href="/policy/shipping">
              Chính sách vận chuyển
            </Link>
            <Link style={{ color: "white" }} href="/policy/return">
              Chính sách đổi trả
            </Link>
            <Link style={{ color: "white" }} href="/policy/payment">
              Phương thức thanh toán
            </Link>
            <Link style={{ color: "white" }} href="/faq">
              Câu hỏi thường gặp
            </Link>
            <Link style={{ color: "white" }} href="/contact">
              Liên hệ
            </Link>
            <Link style={{ color: "white" }} href="/blog">
              Blog
            </Link>
          </Space>
        </Col>

        {/* Đăng ký nhận tin */}
        <Col xs={24} sm={24} md={24} lg={6}>
          <Title level={5} style={{ color: "white" }}>
            ĐĂNG KÝ NHẬN TIN
          </Title>
          <Text style={{ color: "white", display: "block", marginBottom: 16 }}>
            Đăng ký nhận thông tin khuyến mãi và sản phẩm mới
          </Text>
          <Space.Compact style={{ width: "100%" }}>
            <Input placeholder="Email của bạn" style={{ height: 40 }} />
            <Button type="primary" icon={<SendOutlined />} style={{ height: 40, background: "#4f46e5" }}>
              Đăng ký
            </Button>
          </Space.Compact>

          <Title level={5} style={{ color: "white", marginTop: 24 }}>
            ỨNG DỤNG MOBILE
          </Title>
          <Space size="middle">
            <Link href="https://play.google.com" target="_blank">
              <Button
                icon={<AndroidOutlined />}
                style={{ background: "transparent", borderColor: "white", color: "white" }}
              >
                Google Play
              </Button>
            </Link>
            <Link href="https://apple.com/app-store" target="_blank">
              <Button
                icon={<AppleOutlined />}
                style={{ background: "transparent", borderColor: "white", color: "white" }}
              >
                App Store
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: "rgba(255, 255, 255, 0.2)", margin: "24px 0" }} />

      <Row justify="space-between" align="middle">
        <Col>
          <Text style={{ color: "white" }}>© 2024 VĂN PHÒNG PHẨM. Tất cả các quyền được bảo lưu.</Text>
        </Col>
        <Col>
          <Space split={<Divider type="vertical" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />}>
            <Link style={{ color: "white" }} href="/policy/privacy">
              Chính sách bảo mật
            </Link>
            <Link style={{ color: "white" }} href="/policy/terms">
              Điều khoản sử dụng
            </Link>
            <Link style={{ color: "white" }} href="/sitemap">
              Sơ đồ trang
            </Link>
          </Space>
        </Col>
      </Row>
    </Footer>
  )
}

export default FooterComponent
