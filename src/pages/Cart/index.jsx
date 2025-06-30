
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "notistack"
import axios from "axios"

// Ant Design Components
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Typography,
  Checkbox,
  InputNumber,
  Divider,
  Tag,
  Space,
  notification,
  Spin,
} from "antd"

// Ant Design Icons
import {
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  PhoneOutlined,
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

// Local imports
import { formatPrice } from "../../../src/utils/common"
import cartsApi from "../../api/cartApi"
import orderApi from "../../api/ordersApi"
import userApi from "../../api/userApi"
import { removeFromCart, setCartChanged } from "./cartSlice"
import CartClear from "./components/CartClear"
import { cartItemsCountSelector, cartTotalSelector } from "./selectors"
import "./cart-style.css"

const { Title, Text } = Typography

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("Vui lòng nhập tên người nhận"),
  contactPhone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
})

function CartPages() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const cartItems = useSelector((state) => state.cart.cartItems)
  const cartItemsCount = useSelector(cartItemsCountSelector)
  const cartItemsTotal = useSelector(cartTotalSelector)

  const [cartList, setCartList] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    displayName: "",
    contactPhone: "",
    address: "",
    addressDetail: "",
  })
  const [error, setError] = useState("")

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (!userId) {
      setError("No user ID found in local storage")
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const [cartList, userData] = await Promise.all([cartsApi.getAll(userId), userApi.getInfo(userId)])

        setCartList(cartList)
        setFormData(userData)
      } catch (error) {
        console.log("Failed to fetch data", error)
        setError("Failed to fetch data")
        notification.error({
          message: "Lỗi",
          description: "Không thể tải dữ liệu giỏ hàng",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cartItems, userId])

  const handleRemoveItem = async (productId, size, color) => {
    try {
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("access_token")
      const payload = { productId, size, color }

      await axios.put(`http://localhost:5000/api/carts/user/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch(removeFromCart({ productId, size, color }))
      dispatch(setCartChanged(true))
      setCartList(cartList.filter((item) => item.productId !== productId || item.size !== size || item.color !== color))

      notification.success({
        message: "Thành công",
        description: "Đã xóa sản phẩm khỏi giỏ hàng",
      })
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Xóa sản phẩm khỏi giỏ hàng thất bại",
      })
    }
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartList(cartList.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleCheckboxChange = (product, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, product])
    } else {
      setSelectedProducts(selectedProducts.filter((item) => item._id !== product._id))
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts([...cartList])
    } else {
      setSelectedProducts([])
    }
  }

  const handleBuyNow = async (values) => {
    const shippingInfo = {
      receiver: values.displayName,
      phone: values.contactPhone,
      address: values.address,
      addressDetail: values.addressDetail,
      isInCart: true,
    }

    const updatedProducts = selectedProducts.map((selectedProduct) => ({
      productId: selectedProduct.productId,
      price: selectedProduct.product[0].salePrice,
      quantity: selectedProduct.quantity,
      urlImage: selectedProduct.color,
      color: selectedProduct.color,
      size: selectedProduct.size,
    }))

    const payloadPay = { userId, products: updatedProducts, shippingInfo }

    if (!userId) return

    if (selectedProducts.length === 0) {
      notification.warning({
        message: "Cảnh báo",
        description: "Vui lòng chọn ít nhất một sản phẩm để mua hàng!",
      })
      return
    }

    try {
      const req = await orderApi.add(payloadPay)
      navigate(`/orders?id=${req.orderExist._id}`)
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi! Vui lòng thử lại sau.",
      })
    }
  }

  const calculateSelectedTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + item.product[0].salePrice * item.quantity
    }, 0)
  }

  const isAllSelected = cartList.length > 0 && selectedProducts.length === cartList.length

  if (loading) {
    return (
      <div className="cart-loading">
        <Spin size="large" />
        <Text>Đang tải giỏ hàng...</Text>
      </div>
    )
  }

  if (cartList.length === 0) {
    return <CartClear />
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <Title level={2} className="page-title">
            <ShoppingCartOutlined /> Giỏ hàng của bạn
          </Title>
          <Text className="cart-count">({cartItemsCount} sản phẩm)</Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Left Panel - Cart Items */}
          <Col xs={24} lg={14}>
            <Card className="cart-items-card">
              <div className="cart-items-header">
                <Checkbox
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="select-all-checkbox"
                >
                  Chọn tất cả ({cartList.length})
                </Checkbox>
                <Text className="selected-count">Đã chọn: {selectedProducts.length} sản phẩm</Text>
              </div>

              <Divider />

              <div className="cart-items-list">
                {cartList.map((cartItem) => (
                  <div key={cartItem._id} className="cart-item">
                    <div className="cart-item-checkbox">
                      <Checkbox
                        checked={selectedProducts.some((item) => item._id === cartItem._id)}
                        onChange={(e) => handleCheckboxChange(cartItem, e.target.checked)}
                      />
                    </div>

                    <div className="cart-item-image">
                      <img src={cartItem.color || "/placeholder.svg?height=80&width=80"} alt={cartItem.name} />
                    </div>

                    <div className="cart-item-details">
                      <Title level={5} className="product-name">
                        {cartItem.name}
                      </Title>

                      <div className="product-attributes">
                        {cartItem.size && <Tag color="blue">Size: {cartItem.size}</Tag>}
                        {cartItem.colorName && <Tag color="green">Màu: {cartItem.colorName || "Mặc định"}</Tag>}
                      </div>

                      <div className="product-price">
                        <Text strong className="current-price">
                          {formatPrice(cartItem.product[0].salePrice)}
                        </Text>
                        {cartItem.product[0].originalPrice > cartItem.product[0].salePrice && (
                          <Text delete className="original-price">
                            {formatPrice(cartItem.product[0].originalPrice)}
                          </Text>
                        )}
                      </div>

                      <div className="quantity-controls">
                        <Button
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity - 1)}
                          disabled={cartItem.quantity <= 1}
                        />
                        <InputNumber
                          size="small"
                          min={1}
                          value={cartItem.quantity}
                          onChange={(value) => handleQuantityChange(cartItem._id, value)}
                          className="quantity-input"
                        />
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity + 1)}
                        />
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(cartItem.productId, cartItem.size, cartItem.color)}
                        className="delete-button"
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Right Panel - Shipping & Summary */}
          <Col xs={24} lg={10}>
            <Space direction="vertical" size="large" className="right-panel">
              {/* Order Summary */}
              <Card className="summary-card">
                <Title level={4} className="summary-title">
                  <CheckCircleOutlined /> Tóm tắt đơn hàng
                </Title>

                <div className="summary-item">
                  <Text>Sản phẩm đã chọn:</Text>
                  <Text strong>{selectedProducts.length}</Text>
                </div>

                <div className="summary-item">
                  <Text>Tạm tính:</Text>
                  <Text strong>{formatPrice(calculateSelectedTotal())}</Text>
                </div>

                <div className="summary-item">
                  <Text>Phí vận chuyển:</Text>
                  <Text strong>Miễn phí</Text>
                </div>

                <Divider />

                <div className="summary-total">
                  <Text strong>Tổng cộng:</Text>
                  <Title level={4} className="total-price">
                    {formatPrice(calculateSelectedTotal())}
                  </Title>
                </div>
              </Card>

              {/* Shipping Information */}
              <Card className="shipping-card">
                <Title level={4} className="shipping-title">
                  <TruckOutlined /> Thông tin giao hàng
                </Title>

                <Formik
                  initialValues={formData}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleBuyNow}
                >
                  {({ handleChange, handleBlur, errors, touched, isValid, values }) => (
                    <Form className="shipping-form">
                      <div className="form-field">
                        <label className="field-label">
                          <UserOutlined /> Tên người nhận <span className="required">*</span>
                        </label>
                        <Field name="displayName">
                          {({ field }) => (
                            <Input
                              {...field}
                              placeholder="Nhập tên người nhận"
                              status={touched.displayName && errors.displayName ? "error" : ""}
                            />
                          )}
                        </Field>
                        {touched.displayName && errors.displayName && (
                          <Text type="danger" className="error-text">
                            {errors.displayName}
                          </Text>
                        )}
                      </div>

                      <div className="form-field">
                        <label className="field-label">
                          <PhoneOutlined /> Số điện thoại <span className="required">*</span>
                        </label>
                        <Field name="contactPhone">
                          {({ field }) => (
                            <Input
                              {...field}
                              placeholder="Nhập số điện thoại"
                              status={touched.contactPhone && errors.contactPhone ? "error" : ""}
                            />
                          )}
                        </Field>
                        {touched.contactPhone && errors.contactPhone && (
                          <Text type="danger" className="error-text">
                            {errors.contactPhone}
                          </Text>
                        )}
                      </div>

                      <div className="form-field">
                        <label className="field-label">
                          <HomeOutlined /> Địa chỉ (quận, thành phố) <span className="required">*</span>
                        </label>
                        <Field name="address">
                          {({ field }) => (
                            <Input
                              {...field}
                              placeholder="Chọn quận, thành phố"
                              status={touched.address && errors.address ? "error" : ""}
                            />
                          )}
                        </Field>
                        {touched.address && errors.address && (
                          <Text type="danger" className="error-text">
                            {errors.address}
                          </Text>
                        )}
                      </div>

                      <div className="form-field">
                        <label className="field-label">
                          <HomeOutlined /> Số nhà, tên đường
                        </label>
                        <Field name="addressDetail">
                          {({ field }) => <Input {...field} placeholder="Nhập số nhà, tên đường" />}
                        </Field>
                      </div>

                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        className="order-button"
                        disabled={
                          selectedProducts.length === 0 ||
                          !isValid ||
                          !values.displayName ||
                          !values.address ||
                          !values.contactPhone
                        }
                      >
                        Đặt hàng ngay ({selectedProducts.length} sản phẩm)
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CartPages
