// src/admin/pages/Menu/components/CategoryForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const CategoryForm = ({ initialValues, onSubmit }) => {
  return (
    <Form
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Tên Category"
        rules={[{ required: true, message: 'Vui lòng nhập tên category!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="order"
        label="Thứ tự"
        rules={[{ required: true, message: 'Vui lòng nhập thứ tự!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Loại sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Sửa" : "Thêm"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
