"use client"
import PropTypes from "prop-types"
import { Button, Input, message } from "antd"
import { Formik } from "formik"
import * as Yup from "yup"
import orderApi from "../../../api/ordersApi"

const validationSchema = Yup.object().shape({
  receiver: Yup.string().required("Vui lòng nhập tên người nhận"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
  addressDetail: Yup.string().required("Vui lòng nhập chi tiết địa chỉ"),
})

function UpdateShippingInfo({ shippingInfo, setShippingInfo, onClose }) {
  const handleUpdate = async (values) => {
    try {
      const userId = localStorage.getItem("userId")
      const payload = values
      await orderApi.updateShippingInfo(userId, payload)
      message.success("Cập nhật thông tin vận chuyển thành công!")
      setShippingInfo(values)
      onClose()
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin!")
    }
  }

  return (
    <div className="p-6 bg-white">
      <Formik initialValues={shippingInfo} validationSchema={validationSchema} onSubmit={handleUpdate}>
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tên người nhận</label>
              <Input
                name="receiver"
                value={values.receiver}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 rounded-md border-gray-300 focus:border-blue-500"
                status={errors.receiver && touched.receiver ? "error" : ""}
              />
              {errors.receiver && touched.receiver && (
                <div className="text-red-500 text-sm mt-1">{errors.receiver}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 rounded-md border-gray-300 focus:border-blue-500"
                status={errors.phone && touched.phone ? "error" : ""}
              />
              {errors.phone && touched.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
              <Input
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 rounded-md border-gray-300 focus:border-blue-500"
                status={errors.address && touched.address ? "error" : ""}
              />
              {errors.address && touched.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chi tiết địa chỉ</label>
              <Input
                name="addressDetail"
                value={values.addressDetail}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-12 rounded-md border-gray-300 focus:border-blue-500"
                status={errors.addressDetail && touched.addressDetail ? "error" : ""}
              />
              {errors.addressDetail && touched.addressDetail && (
                <div className="text-red-500 text-sm mt-1">{errors.addressDetail}</div>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-semibold rounded-md mt-6"
            >
              Cập nhật thông tin
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

UpdateShippingInfo.propTypes = {
  shippingInfo: PropTypes.object.isRequired,
  setShippingInfo: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default UpdateShippingInfo
