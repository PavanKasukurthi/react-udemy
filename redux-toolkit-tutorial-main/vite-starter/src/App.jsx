import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'

import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal } from './features/cart/cartSlice'
import { useEffect } from 'react'
import cartItems from './cartItems'

function App() {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
