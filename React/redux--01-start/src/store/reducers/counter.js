import * as actionTypes from '../actions';
const initialState = {

    counter: 0,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADDFIVE:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBFIVE:
            return {
                ...state,
                counter: state.counter - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: state.counter })
            }
        case actionTypes.DELETE_RESULT:
            const updatedArr = state.results.filter(result => result.id !== action.resultID);
            return {
                ...state,
                results: updatedArr
            }

    }
    return state;
}
export default reducer;