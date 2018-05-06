import React, { Component } from 'react';  
import {connect} from 'react-redux';               
import Burger from '../../Components/Burger/Burger';
import BurgerControl from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from '../../Components/UI/Spinner/spinner';
import * as actionTypes from '../../store/actions';
// import withErrorHandler from './../../HOC/withErroHandler/withErroHandler';



class BurgerBuilder extends Component {
   state={
      price: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error:false
   }

   componentDidMount(){
         console.log(this.props);
      //    axios.get('https://burger-c72a3.firebaseio.com/ingredients.json')
      //    .then(response =>{
      //          console.log(response);
      //       this.setState({ingredients: response.data});   
      //    }).catch(error =>{
      //       this.setState({error:true});
      //    });
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
     
      const queryParam = [];
      for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      }
      queryParam.push('price=' + this.state.total);
      const queryString = queryParam.join('&');
      this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString
      });
   }

//    addIngredientHandler =(type) => {
//          const oldCount = this.state.ingredients[type];
//          if(oldCount < 0){
//             return;
//          }
//          const updatedCount = oldCount +1;
//          const updatedIngredients = {
//             ...this.state.ingredients
//          };
//          updatedIngredients[type] = updatedCount
//          const priceAddition = INGREDIENT_PRICES[type];
//          const oldPrice = this.state.price;
//          const newPrice = oldPrice + priceAddition;
//          this.setState({price: newPrice,ingredients:updatedIngredients});
//          this.updatePurchase(updatedIngredients);
//    }
//    removeIngredientHandler =(type) =>{
//          const oldCount = this.state.ingredients[type];
//          const updatedCount = oldCount - 1;
//          const updatedIngredients = {
//             ...this.state.ingredients
//          };
//          updatedIngredients[type] = updatedCount
//          const priceAddition = INGREDIENT_PRICES[type];
//          const oldPrice = this.state.price;
//          const newPrice = oldPrice - priceAddition;
//          this.setState({ price: newPrice, ingredients: updatedIngredients });
//          this.updatePurchase(updatedIngredients);
//    }
   render() {
      const disabledInfo ={
         ...this.props.ings
      };
      for(let key in disabledInfo){
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSum= null;         
      let burger =this.state.error ? <p>Ingredients cant be loaded</p> :  <Spinner/>;
      
      if (this.props.ings) {
               burger = (
               <div>
                  <Burger ingredients={this.props.ings} />
                     <BurgerControl
                           total={this.props.price}
                           ingredientAdded={this.props.onIngredientAdded}
                           ingredientRemove={this.props.onIngredientRemoved}
                           disabled={disabledInfo}
                           purchasable={this.state.purchasable}
                           ordered={this.purchaseHandler} />
               </div>   
               );
            orderSum = <OrderSummary price={this.props.price}
                  cancel={this.purchaseCancelHandler}
                  continue={this.purchaseContinueHandler}
                  ingredients={this.props.ings} />
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

const mapStateToProps = state =>{
      return {
            ings: state.ingredients,
            price: state.price
      }
}
const mapDispatchToProps = dispatch =>{
      return{
            onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
            onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName })
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
