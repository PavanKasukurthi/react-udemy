import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { openModal } from '../modal/modalSlice'

const url = 'https://course-api.com/react-useReducer-cart-projet'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(thunkAPI)
      // console.log(thunkAPI.getState())
      // thunkAPI.dispatch(openModal())
      const resp = await axios(url)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

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

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
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
