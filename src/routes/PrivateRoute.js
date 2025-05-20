import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { logout } from '../pages/Auth/userSlice';
import './PrivateRoute.css';

const PrivateRoute = ({ user, children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const isAuthorized = user && (user.role === 'admin' || user.role === 'seller');
        if (!isAuthorized) {
            Modal.confirm({
                title: 'Bạn không có quyền truy cập trang này',
                content: <p>Bạn không có quyền truy cập trang này.</p>,
                okText: 'Tiếp tục',
                okButtonProps: { className: 'custom-ok-button' },
                cancelButtonProps: { style: { display: 'none' } },
                onOk: () => {
                    navigate('/Not-found');
                },
            });
        }
    }, [user, navigate]);

    const isAuthorized = user && (user.role === 'admin' || user.role === 'seller');
    return isAuthorized ? children : null;
};

export default PrivateRoute;
