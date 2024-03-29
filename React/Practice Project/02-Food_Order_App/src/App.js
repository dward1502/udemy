import React, {useState} from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals.jsx';
import Cart from './components/Cart/Cart.jsx'
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}  />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  )
}

export default App

