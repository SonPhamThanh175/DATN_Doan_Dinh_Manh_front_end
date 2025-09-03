import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import UploadImage from './UploadImage';

const { Option } = Select;

const ProductForm = ({ product, onClose, accessToken }) => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const maleTypes = [
        { value: '6696a5e18675a1be4a653e27', label: 'Bút bi cao cấp' },
        { value: '6696a0da8675a1be4a653e1f', label: 'Bút bi thường' },
        { value: '6696a2ce8675a1be4a653e24', label: 'Bút gel mực nước' },
        { value: '6696a6258675a1be4a653e29', label: 'Bút gel nhiều màu' },
        { value: '6696a62e8675a1be4a653e2b', label: 'Bút bi thường' },

    ];

    const femaleTypes = [
        { value: '66ab4f30deb2918d5e8648a1', label: 'Giấy A4' },
        { value: '68b7c8334b1c8a0100028b21', label: 'Giấy A3' },
        { value: '6696a82f8675a1be4a653e2f', label: 'Giấy in ảnh' },
        { value: '6696a8b18675a1be4a653e31', label: 'Giấy bìa cứng' }
    ];

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
            setImageUrls(product.images || []);
            setSelectedCategory(product.size); // nếu đang edit sản phẩm
        } else {
            form.resetFields();
        }
    }, [product]);

    const handleUploadSuccess = (urls) => {
        setImageUrls(urls);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        form.setFieldsValue({ typeId: undefined }); // reset typeId mỗi lần chọn lại category
    };

    const onFinish = async (values) => {
        try {
            const productData = {
                ...values,
                images: imageUrls,
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            if (product) {
                await axios.put(`http://localhost:5000/api/products/${product._id}`, productData, config);
            } else {
                await axios.post('http://localhost:5000/api/products', productData, config);
            }
            onClose();
        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data);
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            {/* Các field khác */}
            <Form.Item
                name="images"
                label="Ảnh sản phẩm"
            >
                <UploadImage
                    onUploadSuccess={handleUploadSuccess}
                    product={product}
                    accessToken={accessToken}
                />
            </Form.Item>

            <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[{ required: true }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="description"
                label="Giới thiệu ngắn gọn sản phẩm"
                rules={[{ required: true }]}
            >
                <Input.TextArea style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="descriptionFull"
                label="Giới thiệu đầy đủ sản phẩm"
                rules={[{ required: true }]}
            >
                <Input.TextArea style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="originalPrice"
                label="Giá gốc"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="salePrice"
                label="Giá sau giảm"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Số lượng sản phẩm"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="categoryId"
                label="Phân loại sản phẩm"
                rules={[{ required: true }]}
            >
                <Select
                    style={{ width: '100%' }}
                    onChange={handleCategoryChange}
                    placeholder="Chi tiết"
                >
                    <Option value="66968d748675a1be4a653de2">Bút</Option>
                    <Option value="66969dec8675a1be4a653e01">Giấy</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="typeId"
                label="Loại sản phẩm"
                rules={[{ required: true }]}
            >
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn loại sản phẩm"
                    disabled={!selectedCategory}
                >
                    {(selectedCategory === '66968d748675a1be4a653de2' ? maleTypes : femaleTypes).map(type => (
                        <Option key={type.value} value={type.value}>
                            {type.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
