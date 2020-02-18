import React, {useState} from 'react';
import {Provider} from 'react-redux'
import productsReducer from './store/reducers/products.reducers';
import cartReducer from './store/reducers/cart.reducer';
import orderReducer from './store/reducers/orders.reducer'
import ShopNavigator from './navigation/ShopNavigator'
import { createStore, combineReducers, compose } from 'redux';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
// import { composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products:productsReducer,
  cart: cartReducer,
  order:orderReducer
})
const store = createStore(rootReducer);

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans': require('./assets/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{
      setFontLoaded(true)
    }}/>
  }
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );  
}
