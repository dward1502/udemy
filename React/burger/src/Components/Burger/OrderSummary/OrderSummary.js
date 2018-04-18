import React from 'react';
import Button from '../../UI/Button/Button';
import { Component } from 'react';

class OrderSummary extends Component {   
   componentDidUpdate(){
      console.log('[OrderSummary] will update');
   }
   render(){
      const ingredientSummary = Object.keys(this.props.ingredients)
         .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span> {this.props.ingredients[igKey]}</li>
         });
      return (
         <div>
            <h3>Your Order</h3>
            <p>Delectable burger with the following ingredients:</p>
            <ul>
               {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
         </div>
      );
   }
   
   
};

export default OrderSummary;