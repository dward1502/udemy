import * as actionTypes from '../actions/index';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.addIngredients:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.removeIngredients:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.initIngredients:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.fetchIngredientsFailed:
            return{
                ...state,
                error:true
            }
        default:
            return state;
    }
};

export default reducer;