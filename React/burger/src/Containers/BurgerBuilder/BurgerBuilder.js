import React, { Component } from 'react';                 
import Burger from '../../Components/Burger/Burger';
import BurgerControl from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../Components/UI/Spinner/spinner';
import withErrorHandler from './../../HOC/withErroHandler/withErroHandler';


const INGREDIENT_PRICES = {
   salad: .5,
   cheese: .3,
   meat: 1.4,
   bacon:.9
}
class BurgerBuilder extends Component {
   state={
      ingredients:null,
      price: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error:false
   }

   componentDidMount(){
         axios.get('https://burger-c72a3.firebaseio.com/ingredients.json')
         .then(response =>{
            this.setState({ingredients: response.data});   
         }).catch(error =>{
            this.setState({error:true});
         });
   }

   updatePurchase(){
      const ingredients = {
         ...this.state.ingredients
      };
      const sum = Object.keys(ingredients).map(igKey =>{
         return ingredients[igKey];
      }).reduce((sum,el)=>{
         return sum + el;
      }, 0);
      this.setState({purchasable: sum>0});
   }
   purchaseHandler = () => {
         this.setState({purchasing:true   })
   }

   purchaseCancelHandler = () =>{
         this.setState({purchasing: false});
   }
   purchaseContinueHandler = () =>{
//      alert('You continue');
      this.setState({loading:true});
            const order={
                  ingredients: this.state.ingredients,
                  price: this.state.price,
                  customer:{
                        name: 'Dan Ward',
                        address:{
                              street: ' test',
                              zipCode: '92106',
                              country: 'USA'
                        },
                  email: 'test@test.gmail.com'
                  },
                  deliveryMethod: 'fastetst'
            }
      axios.post('/orders', order)
      .then(response => {
          this.setState({loading: false, purchasing:false}); 
      })
      .catch(error =>{
            this.setState({loading:false, purchasing:false});
      });
   }

   addIngredientHandler =(type) => {
         const oldCount = this.state.ingredients[type];
         if(oldCount < 0){
            return;
         }
         const updatedCount = oldCount +1;
         const updatedIngredients = {
            ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.price;
         const newPrice = oldPrice + priceAddition;
         this.setState({price: newPrice,ingredients:updatedIngredients});
         this.updatePurchase(updatedIngredients);
   }
   removeIngredientHandler =(type) =>{
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount - 1;
         const updatedIngredients = {
            ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.price;
         const newPrice = oldPrice - priceAddition;
         this.setState({ price: newPrice, ingredients: updatedIngredients });
         this.updatePurchase(updatedIngredients);
   }
   render() {
      const disabledInfo ={
         ...this.state.ingredients
      };
      for(let key in disabledInfo){
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSum= null;         
      let burger =this.state.error ? <p>Ingredients cant be loaded</p> :  <Spinner/>;
      
      if (this.state.ingredients) {
               burger = (
               <div><Burger ingredients={this.state.ingredients} />
                     <BurgerControl
                           total={this.state.price}
                           ingredientAdded={this.addIngredientHandler}
                           ingredientRemove={this.removeIngredientHandler}
                           disabled={disabledInfo}
                           purchasable={this.state.purchasable}
                           ordered={this.purchaseHandler} />
               </div>   );
            orderSum = <OrderSummary price={this.state.price}
                  cancel={this.purchaseCancelHandler}
                  continue={this.purchaseContinueHandler}
                  ingredients={this.state.ingredients} />
      }
         if (this.state.loading) {
               orderSum = <Spinner />
         }
       
     
      return (
         <div>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSum}
                
            </Modal>
                  {burger}
            
         </div>
      );
   }

}

export default withErrorHandler(BurgerBuilder, axios);
