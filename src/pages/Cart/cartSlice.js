import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    cartChanged: false,
  },

  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true
    },

    hideMiniCart(state) {
      state.showMiniCart = false
    },

    addToCart(state, action) {
      const newItem = action.payload // { productId, userId, quantity, product }

      console.log("[v0] Adding to cart:", {
        productId: newItem.productId,
        productName: newItem.product?.name,
        userId: newItem.userId,
        quantity: newItem.quantity,
      })

      const actualProductId = newItem.productId || newItem.product?._id

      console.log("[v0] Actual product ID used:", actualProductId)
      console.log(
        "[v0] Current cart items:",
        state.cartItems.map((item) => ({
          productId: item.productId,
          productName: item.product?.name,
        })),
      )

      const index = state.cartItems.findIndex((x) => x.productId === actualProductId && x.userId === newItem.userId)

      console.log("[v0] Found existing item at index:", index)

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity
        console.log("[v0] Updated quantity for existing item")
      } else {
        const cartItem = {
          ...newItem,
          productId: actualProductId, // Ensure productId is set correctly
          product: {
            ...newItem.product,
            // Make sure we use the image property for office supplies
            displayImage: newItem.product.image || "/assorted-office-supplies.png",
          },
        }
        state.cartItems.push(cartItem)
        console.log("[v0] Added new item to cart")
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },

    setQuantity(state, action) {
      const { productId, userId, quantity } = action.payload
      const index = state.cartItems.findIndex((x) => x.productId === productId && x.userId === userId)

      if (index >= 0) {
        state.cartItems[index].quantity = quantity
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },

    removeFromCart(state, action) {
      const { productId, userId } = action.payload
      state.cartItems = state.cartItems.filter((x) => !(x.productId === productId && x.userId === userId))
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      state.cartChanged = true
    },

    setCartChanged(state, action) {
      state.cartChanged = action.payload
    },
  },
})

const { actions, reducer } = cartSlice

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart, setCartChanged } = actions

export default reducer
