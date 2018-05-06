import * as actionTypes from './actions';

const initalState ={
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:0
    },
    price: 4
}
const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .3,
    meat: 1.4,
    bacon: .9
}

const reducer = (state = initalState, action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            break;
    }
    return
}

export default reducer;