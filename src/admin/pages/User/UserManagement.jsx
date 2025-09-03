import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('access_token');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách người dùng!');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa người dùng này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    message.success('Xóa người dùng thành công!');
                    fetchUsers();
                } catch (error) {
                    message.error('Lỗi khi xóa người dùng!');
                }
            },
        });
    };

    const columns = [
        {
            title: 'Tài Khoản',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Tên Người Dùng',
            dataIndex: 'displayName',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Button
                    danger
                    onClick={() => handleDelete(record._id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý người dùng</h2>
            <Table
                dataSource={users.filter((user) => user.role !== 'admin')}
                columns={columns}
                rowKey='_id'
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default UserManagement;
