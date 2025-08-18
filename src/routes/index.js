import { LoginPage } from "../../src/pages/Auth/LoginPage/index";
import AboutUs from "../pages/AboutUs";
import BlogPage from "../pages/BlogPage";
// import { SocialRedirect } from "../pages/Auth/SocialMediaRedirect";
import CartPages from "../pages/Cart";
// import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import OrderPage from "../pages/Order";
import Product from "../pages/Product";
import ProductAdditional from "../pages/Product/components/ProductAdditional";
import ProductDescription from "../pages/Product/components/ProductDescription";
import ProductReviews from "../pages/Product/components/ProductReviews";
// // import SuggestedProducts from "../pages/Product/components/SuggestedProducts ";
import DetailPage from "../pages/Product/pages/DetailPage";
import SuccessPage from "../pages/Order/components/SuccessPage";
import OrderHistory from "../pages/Order/components/OrderHistory";  
import AccountInfo from "../pages/AccountInfo";
import Account from "../pages/AccountInfo/components/Account";
import AccountAdditional from "../pages/AccountInfo/components/AccountAdditional";
// import AdminPage from "../admin/pages";
// import Dashboard from "../admin/pages/Dashboard";
// import MenuManagement from "../admin/pages/Menu/MenuManagement";
// import OrderManagement from "../admin/pages/Order/OrderManagement";
// import ProductManagement from "../admin/pages/Product/ProductManagement";
// import UserManagement from "../admin/pages/User/UserManagement";
// import RevenueManagement from "../admin/pages/RevenueManagement";
// import ProductViewAll from "../pages/Product/components/ProductViewAll";
// import BlogPage from "../pages/BlogPage";
// import AboutUs from "../pages/AboutUs";

import HomePage from "../pages/HomePage";


export const routes = [
    { 
        path:'/',
        exact: true,
        page : HomePage,
        isShowHeader : true,
        isShowFooter : false,
    },
    // { 
    //     path:'/admin',
    //     page : AdminPage,
    //     isPrivate: true,
    //     children: [
    //         {
    //           path: 'dashboard',
    //           page: Dashboard,
    //         },
    //         {
    //           path: 'products',
    //           page: ProductManagement,
    //         },
    //         {
    //           path: 'menu',
    //           page: MenuManagement,
    //         },
    //         {
    //           path: 'orders',
    //           page: OrderManagement,
    //         },
    //         {
    //           path: 'users',
    //           page: UserManagement,
    //         },
    //         {
    //           path: 'statistics/revenue',
    //           page: RevenueManagement,
    //         },
    //       ],
    // },
    { 
        path:'/login',
        exact: true,
        page : LoginPage,
        isShowHeader : false,
        isShowFooter : false,
    },
    { 
        path:'/products',
        // exact: true,
        page : Product,
        isShowHeader : true,
        isShowFooter : true,
    },
    // { 
    //     path:'/products/view-all',
    //     // exact: true,
    //     page : ProductViewAll,
    //     isShowHeader : true,
    //     isShowFooter : true,
    // },
    { 
        path:'/products/:productId',
        // exact: true,
        page : DetailPage,
        isShowHeader : true,
        isShowFooter : true,
        children: [
            {
              path: '',
              page: ProductDescription,
            },
            {
              path: 'additional',
              page: ProductAdditional,
            },
            {
              path: 'reviews',
              page: ProductReviews,
            },
          ],
    },
    // { 
    //     path:'/auth/social/redirect',
    //     page : SocialRedirect,
    //     isShowHeader : true,
    //     isShowFooter : true,
    // },
    { 
        path:'/cart',
        page : CartPages,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/orders',
        page : OrderPage,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/order-history',
        page : OrderHistory,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/account',
        page : AccountInfo,
        isShowHeader : true,
        isShowFooter : true,
        children: [
            {
              path: '',
              page: Account,
            },
            {
              path: 'additional',
              page: AccountAdditional,
            },
          ],
    },
    { 
        path:'/about',
        page : AboutUs,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/blog',
        page : BlogPage,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/success-page',
        page : SuccessPage,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    // // { 
    // //     path:'/test',
    // //     page : SuggestedProducts,
    // //     isShowHeader : true,
    // //     isShowFooter : true,
    // // },
    { 
        path:'*',
        page : NotFound,
    },
]