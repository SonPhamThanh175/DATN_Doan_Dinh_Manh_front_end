import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: JSON.parse(localStorage.getItem("cart")) || [],
        cartChanged: false,
    },

    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },

        hideMiniCart(state) {
            state.showMiniCart = false;
        },

        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(
                (x) =>
                    x.productId === newItem.productId &&
                    x.size === newItem.size &&
                    x.color === newItem.color
            );

            if (index >= 0) {
                // Tăng số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                // Thêm sản phẩm mới vào giỏ hàng
                state.cartItems.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        setQuantity(state, action) {
            const { productId, size, color, quantity } = action.payload;
            const index = state.cartItems.findIndex(
                (x) => x.productId === productId && x.size === size && x.color === color
            );

            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const { productId, size, color } = action.payload;
            state.cartItems = state.cartItems.filter(
                (x) =>  x.size !== size || x.color !== color
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
            state.cartChanged = true;
        },
        setCartChanged(state, action) {
            state.cartChanged = action.payload;
        }
        
    },
});
// Redux tự định nghĩa actions và reducer 
const { actions , reducer } = cartSlice ;
// Trong actions thì có showMiniCart,hideMiniCart,addToCart,setQuantity,removeFromCart
export const {  showMiniCart ,
                hideMiniCart , 
                addToCart , 
                setQuantity , 
                removeFromCart ,
                removeItem ,
                setCartChanged
                } = actions

export default reducer