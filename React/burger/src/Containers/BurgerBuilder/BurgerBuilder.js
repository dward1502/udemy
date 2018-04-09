import React, { Component } from 'react';                 
import Burger from '../../Components/Burger/Burger';
import BurgerControl from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
   salad: .5,
   cheese: .3,
   meat: 1.4,
   bacon:.9
}
class BurgerBuilder extends Component {
   state={
      ingredients:{
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0
      },
      price: 4,
      purchasable: false,
      purchasing: false
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
      return (
         <div>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  <OrderSummary price={this.state.price}
                  cancel={this.purchaseCancelHandler}
                  continue={this.purchaseContinueHandler}
                  ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BurgerControl 
            total = {this.state.price}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}/>
         </div>
      );
   }

}

export default BurgerBuilder;
