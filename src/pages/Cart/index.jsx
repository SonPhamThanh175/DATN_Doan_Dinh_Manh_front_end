"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "notistack"
import axios from "axios"

// Material UI Components
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Divider,
  Container,
  useMediaQuery,
  useTheme,
  Chip,
} from "@material-ui/core"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import StraightenIcon from "@mui/icons-material/Straighten"
import ColorLensIcon from "@mui/icons-material/ColorLens"

// Local imports
import { formatPrice } from "../../../src/utils/common"
import cartsApi from "../../api/cartApi"
import orderApi from "../../api/ordersApi"
import userApi from "../../api/userApi"
import SearchAddressField from "../../components/form-controls/SearchAddressField"
import { removeFromCart, setCartChanged } from "./cartSlice"
import CartClear from "./components/CartClear"
import { cartItemsCountSelector, cartTotalSelector } from "./selectors"

// Add a new style for required field indicators
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 64px)",
  },
  pageTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: 0,
      width: 60,
      height: 3,
      backgroundColor: "#000",
    },
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  cartContainer: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  leftPanel: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightPanel: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    height: "100%",
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 0),
    borderBottom: "1px solid #eee",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  cartItemContent: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  cartImage: {
    width: 80,
    height: 80,
    objectFit: "cover",
    marginRight: theme.spacing(2),
    border: "1px solid #eee",
    padding: theme.spacing(0.5),
  },
  cartDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  productPrice: {
    fontWeight: 600,
    color: "#000",
  },
  productAttributes: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  attributeChip: {
    height: 24,
    fontSize: "0.75rem",
    backgroundColor: "#f0f0f0",
    "& .MuiChip-icon": {
      fontSize: "0.875rem",
      marginLeft: 4,
    },
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: 4,
    marginTop: theme.spacing(1),
    width: "fit-content",
  },
  quantityButton: {
    minWidth: 32,
    height: 32,
    padding: 0,
  },
  quantityText: {
    padding: theme.spacing(0, 1.5),
    fontWeight: 500,
  },
  deleteButton: {
    color: "#999",
    "&:hover": {
      color: "#f44336",
    },
  },
  checkboxContainer: {
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    cursor: "pointer",
    accentColor: "#000",
  },
  formField: {
    marginBottom: theme.spacing(2.5),
  },
  fieldLabel: {
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
    display: "block",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 4,
    },
  },
  orderButton: {
    backgroundColor: "#000",
    color: "#fff",
    padding: theme.spacing(1.5, 4),
    borderRadius: 0,
    fontWeight: 600,
    marginTop: theme.spacing(3),
    "&:hover": {
      backgroundColor: "#333",
    },
    "&:disabled": {
      backgroundColor: "#ccc",
    },
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1.5),
  },
  summaryLabel: {
    color: "#666",
  },
  summaryValue: {
    fontWeight: 600,
  },
  totalRow: {
    borderTop: "1px solid #eee",
    paddingTop: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    "& $summaryLabel, & $summaryValue": {
      fontSize: "1.1rem",
      fontWeight: 700,
    },
  },
  emptyCart: {
    textAlign: "center",
    padding: theme.spacing(6, 2),
  },
  requiredIndicator: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
  },
  formValidationError: {
    color: theme.palette.error.main,
    fontSize: "0.875rem",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
}))

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("Vui lòng nhập tên người nhận"),
  contactPhone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
})

function CartPages() {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const cartItems = useSelector((state) => state.cart.cartItems)
  const cartItemsCount = useSelector(cartItemsCountSelector)
  const cartItemsTotal = useSelector(cartTotalSelector)

  const [cartList, setCartList] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
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
      return
    }
    ;(async () => {
      try {
        const [cartList, userData] = await Promise.all([cartsApi.getAll(userId), userApi.getInfo(userId)])

        setCartList(cartList)
        console.log("cartList", cartList)

        setFormData(userData)
      } catch (error) {
        console.log("Failed to fetch data", error)
        setError("Failed to fetch data")
      }
    })()
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

      enqueueSnackbar("Đã xóa khỏi giỏ hàng!", { variant: "success" })
    } catch (error) {
      enqueueSnackbar("Xóa sản phẩm khỏi giỏ hàng thất bại!", {
        variant: "error",
      })
    }
  }

  const handleIncreaseQuantity = (id) => {
    setCartList(cartList.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const handleDecreaseQuantity = (id) => {
    setCartList(
      cartList.map((item) => (item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  const handleCheckboxChange = (product) => {
    if (selectedProducts.some((item) => item._id === product._id)) {
      setSelectedProducts(selectedProducts.filter((item) => item._id !== product._id))
    } else {
      setSelectedProducts([...selectedProducts, product])
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

    const updatedProducts = selectedProducts.map((selectedProduct) => {
      return {
        productId: selectedProduct.productId,
        price: selectedProduct.product[0].salePrice,
        quantity: selectedProduct.quantity,
        urlImage: selectedProduct.color,
        color: selectedProduct.color,
        size: selectedProduct.size,
      }
    })

    const payloadPay = { userId, products: updatedProducts, shippingInfo }

    if (!userId) {
      return
    }

    if (selectedProducts.length === 0) {
      enqueueSnackbar("Vui lòng chọn ít nhất một sản phẩm để mua hàng!", {
        variant: "warning",
      })
      return
    }

    try {
      const req = await orderApi.add(payloadPay)
      navigate(`/orders?id=${req.orderExist._id}`)
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi! Vui lòng thử lại sau.", {
        variant: "error",
      })
    }
  }

  // Calculate total for selected products
  const calculateSelectedTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + item.product[0].salePrice * item.quantity
    }, 0)
  }

  if (cartList.length === 0) {
    return <CartClear />
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" component="h1" className={classes.pageTitle}>
          Giỏ hàng của bạn
        </Typography>

        <Box className={classes.cartContainer}>
          {/* Left Panel - Shipping Information */}
          <Box className={classes.leftPanel}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.sectionTitle}>
                <LocalShippingIcon /> Thông tin vận chuyển
              </Typography>

              <Formik
                initialValues={formData}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleBuyNow}
              >
                {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => (
                  <Form>
                    <Box className={classes.formField}>
                      <Typography className={classes.fieldLabel}>
                        Tên người nhận <span className={classes.requiredIndicator}>*</span>
                      </Typography>
                      <Field
                        as={TextField}
                        name="displayName"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.displayName && Boolean(errors.displayName)}
                        helperText={touched.displayName && errors.displayName}
                      />
                    </Box>

                    <Box className={classes.formField}>
                      <Typography className={classes.fieldLabel}>
                        Địa chỉ (quận, thành phố) <span className={classes.requiredIndicator}>*</span>
                      </Typography>
                      <Field
                        as={SearchAddressField}
                        name="address"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                      />
                    </Box>

                    <Box className={classes.formField}>
                      <Typography className={classes.fieldLabel}>Số nhà, tên đường</Typography>
                      <Field
                        as={TextField}
                        name="addressDetail"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box className={classes.formField}>
                      <Typography className={classes.fieldLabel}>
                        Số điện thoại <span className={classes.requiredIndicator}>*</span>
                      </Typography>
                      <Field
                        as={TextField}
                        name="contactPhone"
                        variant="outlined"
                        fullWidth
                        className={classes.input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.contactPhone && Boolean(errors.contactPhone)}
                        helperText={touched.contactPhone && errors.contactPhone}
                      />
                    </Box>

                    <Divider style={{ margin: "24px 0 16px" }} />

                    {/* Order Summary for Mobile */}
                    {isMobile && (
                      <Box mb={3}>
                        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                          Tóm tắt đơn hàng
                        </Typography>

                        <Box className={classes.summaryItem}>
                          <Typography className={classes.summaryLabel}>Sản phẩm đã chọn:</Typography>
                          <Typography className={classes.summaryValue}>{selectedProducts.length}</Typography>
                        </Box>

                        <Box className={`${classes.summaryItem} ${classes.totalRow}`}>
                          <Typography className={classes.summaryLabel}>Tổng tiền:</Typography>
                          <Typography className={classes.summaryValue}>
                            {formatPrice(calculateSelectedTotal())}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Form validation message */}
                    {!isValid && dirty && (
                      <Typography variant="body2" color="error" className={classes.formValidationError}>
                        Vui lòng điền đầy đủ thông tin để tiếp tục đặt hàng
                      </Typography>
                    )}

                    <Button
                      className={classes.orderButton}
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={
                        selectedProducts.length === 0 ||
                        !isValid ||
                        !values.displayName ||
                        !values.address ||
                        !values.contactPhone
                      }
                    >
                      Đặt hàng ngay
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Box>

          {/* Right Panel - Cart Items */}
          <Box className={classes.rightPanel}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.sectionTitle}>
                <ShoppingCartIcon /> Giỏ hàng ({cartItemsCount})
              </Typography>

              {cartList.map((cartItem) => (
                <Box key={cartItem._id} className={classes.cartItem}>
                  <Box className={classes.checkboxContainer}>
                    <input
                      type="checkbox"
                      className={classes.checkbox}
                      checked={selectedProducts.some((item) => item._id === cartItem._id)}
                      onChange={() => handleCheckboxChange(cartItem)}
                    />
                  </Box>

                  <Box className={classes.cartItemContent}>
                    <img src={cartItem.color || "/placeholder.svg"} alt={cartItem.name} className={classes.cartImage} />

                    <Box className={classes.cartDetails}>
                      <Typography className={classes.productName}>{cartItem.name}</Typography>

                      <Box className={classes.productAttributes}>
                        {cartItem.size && (
                          <Chip
                            icon={<StraightenIcon />}
                            label={`Size: ${cartItem.size}`}
                            size="small"
                            className={classes.attributeChip}
                          />
                        )}
                        {cartItem.colorName && (
                          <Chip
                            icon={<ColorLensIcon />}
                            label={`Màu: ${cartItem.colorName || "Mặc định"}`}
                            size="small"
                            className={classes.attributeChip}
                          />
                        )}
                      </Box>

                      <Typography className={classes.productPrice}>
                        {formatPrice(cartItem.product[0].salePrice)}
                      </Typography>

                      <Box className={classes.quantityControl}>
                        <Button
                          className={classes.quantityButton}
                          onClick={() => handleDecreaseQuantity(cartItem._id)}
                          disabled={cartItem.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>

                        <Typography className={classes.quantityText}>{cartItem.quantity}</Typography>

                        <Button className={classes.quantityButton} onClick={() => handleIncreaseQuantity(cartItem._id)}>
                          <AddIcon fontSize="small" />
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleRemoveItem(cartItem.productId, cartItem.size, cartItem.color)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}

              {/* Order Summary for Desktop */}
              {!isMobile && (
                <>
                  <Divider style={{ margin: "16px 0" }} />

                  <Box mt={2}>
                    <Box className={classes.summaryItem}>
                      <Typography className={classes.summaryLabel}>Sản phẩm đã chọn:</Typography>
                      <Typography className={classes.summaryValue}>{selectedProducts.length}</Typography>
                    </Box>

                    <Box className={`${classes.summaryItem} ${classes.totalRow}`}>
                      <Typography className={classes.summaryLabel}>Tổng tiền:</Typography>
                      <Typography className={classes.summaryValue}>{formatPrice(calculateSelectedTotal())}</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CartPages
