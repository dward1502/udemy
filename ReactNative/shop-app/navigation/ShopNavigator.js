import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/ProductsOverviewScree';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UserProductsScreen from '../screens/UserProductsScreen';
import EditProuctScreen from '../screens/EditProductsScreen'

import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const defaultNavOptions = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
		},
		headerTitle: {
			fontFamily: 'open-sans-bold'
		},
		headerBackTitleStyle: {
			fontFamily: 'open-sans'
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
	}
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen
	},
	{
		navigationOptions:{
			drawerIcon: drawerConfig =><Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen
	},
	{
		navigationOptions:{
			drawerIcon: drawerConfig =><Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor}/>
		},
		defaultNavigationOptions: defaultNavOptions
	}
);
const AdminNavigator = createStackNavigator(
	{
		UserProduct: UserProductsScreen,
		EditProduct: EditProuctScreen
	},
	{
		navigationOptions:{
			drawerIcon: drawerConfig =><Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor}/>
		},
		defaultNavigationOptions: defaultNavOptions
	}
);
const ShopNavigator = createDrawerNavigator({
	Products:ProductsNavigator,
	Orders: OrdersNavigator,
	Admin:AdminNavigator
},{
	contentOptions:{
		activeTintcolor:Colors.primary
	}
})
export default createAppContainer(ShopNavigator);
