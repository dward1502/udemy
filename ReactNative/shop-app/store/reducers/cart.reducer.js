import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart.actions';
import { ADD_ORDER}from '../actions/orders.actions';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products.actions';

const initalState = {
	items: [],
	totalAmount: 0
};

export default (state = initalState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.product;
			const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      
      let updatedOrNewCartItem;

			if (items[addedProduct.id]) {
				updatedOrNewCartItem = new CartItem(
					state.items[addedProduct.id].quantity + 1,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				);
			} else {
				updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle);
      }
      return {
        ...state,
        items: { ...state.item, [addedProduct.id]: newCartItem },
        totalAmount: state.totalAmount + prodPrice
			};

			case REMOVE_FROM_CART :
				const selectedCartItem = state.items[action.pid];
				const currentQty = selectedCartItem.quantity;
				let updatedCartItems;
				if(currentQty > 1) {
					const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productTitle, selectedCartItem.productPrice,selectedCartItem.sum - selectedCartItem.productPrice);
					updatedCartItem = {...state.items, [action.pid]: updatedCartItem}

				} else {
					updatedCartItems = {...state.items};
					delete updatedCartItems[action.pid];
				}
				return {
					...state,
					items:updatedCartItem,
					totalAmount: state.totalAmount - selectedCartItem.productPrice
				}
				case ADD_ORDER:
					return initalState
				case DELETE_PRODUCT:
					if(!state.items[action.pid]){
						return state;
					}
					const updatedItems = {...state.items};
					const itemTotal = state.items[action.pid].sum;
					delete updatedItems[action.pid];
					return {
						...state,
						items: updatedItems,
						totalAmount:state.totalAmount - itemTotal
					}
	}
	return state;
};
