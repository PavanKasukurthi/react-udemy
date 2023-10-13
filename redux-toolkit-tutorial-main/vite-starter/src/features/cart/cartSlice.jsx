import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      // return { ...initialState, cartItems: [] }
    },

    removeItem: (state, action) => {
      // console.log(action)
      const id = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== id)
    },

    increaseItem: (state, action) => {
      const id = action.payload
      const cartItem = state.cartItems.find((item) => item.id === id)
      cartItem.amount = cartItem.amount + 1
    },

    decreaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount -= 1
    },

    calculateTotal: (state) => {
      let amount = 0
      let total = 0

      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })

      state.amount = amount
      state.total = total
    },
  },
})

// console.log(cartSlice)

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotal,
} = cartSlice.actions
export default cartSlice.reducer