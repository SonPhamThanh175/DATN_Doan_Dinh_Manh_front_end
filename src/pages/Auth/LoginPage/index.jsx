"use client"

import { useState } from "react"
import { login, register } from "../userSlice"
import { useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { useSnackbar } from "notistack"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { loginSchema, registerSchema } from "../validationSchema"
import { useNavigate } from "react-router-dom"
import { Building2, Package, FileText, Calculator, Facebook, Mail } from "lucide-react"
import "./style.css"

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  })

  const changeForm = (e) => {
    e.preventDefault()
    setIsSignUp(!isSignUp)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const action = login(values)
      const resultAction = await dispatch(action)
      const user = unwrapResult(resultAction)

      enqueueSnackbar("Đăng nhập thành công!", { variant: "success" })

      if (user.role === "admin" || user.role === "seller") {
        navigate("/admin")
      } else {
        navigate("/products")
      }
    } catch (error) {
      const errMessage = error.response?.data?.message || error.message || "Đăng nhập thất bại"
      console.log("Failed to login : ", errMessage)
      enqueueSnackbar(errMessage, { variant: "error" })
      navigate("/login")
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    const { confirmPassword, ...submitValues } = values

    try {
      const action = register(submitValues)
      const resultAction = await dispatch(action)
      unwrapResult(resultAction)
      enqueueSnackbar("Đăng ký thành công!", { variant: "success" })
    } catch (error) {
      const errMessage = error.response?.data?.message || error.message || "Đăng ký thất bại"
      console.log("Failed to register : ", errMessage)
      enqueueSnackbar(errMessage, { variant: "error" })
    }
    setSubmitting(false)
  }

  const HandleLoginWithFacebook = () => {
    window.location.href = "http://localhost:5000/api/auth/facebook/login"
  }

  const HandleLoginWithGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google/login"
  }

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="pattern-icon pattern-icon-1">
          <Package size={64} />
        </div>
        <div className="pattern-icon pattern-icon-2">
          <FileText size={48} />
        </div>
        <div className="pattern-icon pattern-icon-3">
          <Calculator size={56} />
        </div>
        <div className="pattern-icon pattern-icon-4">
          <Building2 size={72} />
        </div>
      </div>

      <div className="login-container">
        {/* Header */}
        <div className="header-section">
          <div className="brand-logo">
            <Building2 size={48} />
            <h1>HUCE</h1>
          </div>
          <p className="brand-tagline">Giải pháp văn phòng phẩm toàn diện</p>
        </div>

        <div className="main-card">
          <div className="forms-container">
            {/* Login Form */}
            <div className={`form-section login-form ${isSignUp ? "hidden" : "active"}`}>
              <Formik initialValues={formData} validationSchema={loginSchema} onSubmit={handleLoginSubmit}>
                {({ isSubmitting, handleChange, handleBlur }) => (
                  <Form className="auth-form">
                    <div className="form-header">
                      <h2>Đăng Nhập</h2>
                      <p>Chào mừng bạn trở lại!</p>
                    </div>

                    {/* Social Login */}
                    <div className="social-buttons">
                      <button type="button" onClick={HandleLoginWithFacebook} className="social-btn facebook-btn">
                        <Facebook size={20} />
                        <span>Facebook</span>
                      </button>
                      <button type="button" onClick={HandleLoginWithGoogle} className="social-btn google-btn">
                        <Mail size={20} />
                        <span>Google</span>
                      </button>
                    </div>

                    <div className="divider">
                      <span>hoặc đăng nhập bằng tài khoản</span>
                    </div>

                    <div className="form-fields">
                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="username"
                          type="text"
                          placeholder="Tên đăng nhập"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="username" component="div" className="error-message" />
                      </div>

                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="password"
                          type="password"
                          placeholder="Mật khẩu"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                      </div>
                    </div>

                    <div className="forgot-password">
                      <a href="/forgotPassword">Quên mật khẩu?</a>
                    </div>

                    <button className="submit-btn" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
                    </button>

                    <p className="switch-form">
                      Chưa có tài khoản?{" "}
                      <button type="button" onClick={changeForm} className="switch-btn">
                        Đăng ký ngay
                      </button>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Register Form */}
            <div className={`form-section register-form ${!isSignUp ? "hidden" : "active"}`}>
              <Formik initialValues={formData} validationSchema={registerSchema} onSubmit={handleRegisterSubmit}>
                {({ isSubmitting, handleChange, handleBlur }) => (
                  <Form className="auth-form">
                    <div className="form-header">
                      <h2>Đăng Ký</h2>
                      <p>Tạo tài khoản mới</p>
                    </div>

                    <div className="form-fields">
                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="username"
                          type="text"
                          placeholder="Tên đăng nhập"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="username" component="div" className="error-message" />
                      </div>

                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="displayName"
                          type="text"
                          placeholder="Tên hiển thị"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="displayName" component="div" className="error-message" />
                      </div>

                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="password"
                          type="password"
                          placeholder="Mật khẩu"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                      </div>

                      <div className="field-group">
                        <Field
                          className="form-input"
                          name="confirmPassword"
                          type="password"
                          placeholder="Xác nhận mật khẩu"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                      </div>
                    </div>

                    <button className="submit-btn" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Đang đăng ký..." : "ĐĂNG KÝ"}
                    </button>

                    <p className="switch-form">
                      Đã có tài khoản?{" "}
                      <button type="button" onClick={changeForm} className="switch-btn">
                        Đăng nhập
                      </button>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>

            {/* Sliding Panel */}
            <div className={`sliding-panel ${isSignUp ? "slide-left" : "slide-right"}`}>
              <div className="panel-content">
                {!isSignUp ? (
                  <div className="panel-info">
                    <Package size={64} className="panel-icon" />
                    <h3>Chào mừng đến với HUCE!</h3>
                    <p>Khám phá hàng ngàn sản phẩm văn phòng phẩm chất lượng cao với giá cả hợp lý</p>
                    <div className="features-list">
                      <p>✓ Giao hàng nhanh chóng</p>
                      <p>✓ Chất lượng đảm bảo</p>
                      <p>✓ Hỗ trợ 24/7</p>
                    </div>
                  </div>
                ) : (
                  <div className="panel-info">
                    <Building2 size={64} className="panel-icon" />
                    <h3>Chào bạn!</h3>
                    <p>Đăng nhập để trải nghiệm mua sắm văn phòng phẩm tuyệt vời nhất</p>
                    <div className="features-list">
                      <p>✓ Ưu đãi độc quyền</p>
                      <p>✓ Theo dõi đơn hàng</p>
                      <p>✓ Tích điểm thưởng</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p>&copy; 2024 HUCE. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  )
}
