import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.css'
import  axios  from '../../../axios-orders';
import Spinner from './../../../Components/UI/Spinner/spinner';
import Input from './../../../Components/UI/Input/Input';

class ContactData extends Component {
   state={
      orderForm:{
            name:{
                  elementType: 'input',
                  elementConfig: {
                        type: 'text',
                        placeholder: 'Dan Ward'
                  },
                  value: ''
            },
            street: {
                  elementType: 'input',
                  elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                     },
                  value: ''
            },
            zipCode: {
                  elementType: 'input',
                  elementConfig: {
                        type: 'text',
                        placeholder: 'ZIPCODE'
                  },
                  value: ''
            },
            country: {
                  elementType: 'input',
                  elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                  },
                  value: ''
            },
            email: {
                  elementType: 'input',
                  elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                  },
                  value: ''
            },
            deliveryMethod: {
                  elementType: 'select',
                  elementConfig: {
                        options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                  },
                  value: ''
            },
            loading: false,
      }      
   }
   componentDidMount(){
      
   }

   orderHandler=(event)=>{
      event.preventDefault();
      console.log(this.props.ingredients);
       this.setState({loading:true});
            const order={
                  ingredients: this.props.ingredients,
                  price: this.props.price
            }
      axios.post('/orders', order)
      .then(response => {
          this.setState({loading: false, purchasing:false}); 
      })
      .catch(error =>{
            this.setState({loading:false, purchasing:false});
      });
   }

   inputChangedHandler=(event, inputIndentifier)=>{
      const updatedOrderForm = {
            ...this.state.orderForm
      }
      const updatedFormEl = {
            ...updatedOrderForm[inputIndentifier]
      }
      updatedFormEl.value = event.target.value;
      updatedOrderForm[inputIndentifier] = updatedFormEl;
      this.setState({
            orderForm:updatedOrderForm
      });
   }
   render() {
      const formElArray = [];
      for(let key in this.state.orderForm){
            formElArray.push({
                  id:key,
                  config: this.state.orderForm[key]
            });
      }
      let form = (
      <form >
         {formElArray.map(formElement =>(
               <Input   key={formElement.id}
                        elementtype={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event)=> this.inputChangedHandler(event,formElement.id)}/>
         ))}
         <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>       
      );
      if(this.state.loading){
         form = <Spinner/>
      }
      
      return (
         <div className={classes.ContactData}>
             <h3>Enter Your Contact Data</h3> 
             {form}
         </div>
      );
   }
}

export default ContactData;