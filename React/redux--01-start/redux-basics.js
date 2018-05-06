const redux = require('redux');
const createStore = redux.createStore;

const initalState ={
   counter: 0
}
//reducer
//state = initalState is a defualt function in es6 will use initialState when state is undefined
const rootReducer = (state = initalState,action) =>{
   if(action.type === 'INC_COUNTER'){
      return {
         ...state,
         counter: state.counter + 1
      };
   }
   if (action.type === 'ADD_COUNTER') {
      return {
         ...state, //copies the original state does not allow you to override the state but creates a new one
         counter: state.counter + action.value
      };
   }
   return state;
};
//store
const store = createStore(rootReducer);
console.log(store.getState());

//subscription
//will run subscribe when an action is dispatched to the reducer
store.subscribe(() => {
   console.log('[Subscription]', store.getState());
});

//dispatching actions
//type needs to be ther to define the dispatch and a payload object can be added after
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value:10});
console.log(store.getState());

