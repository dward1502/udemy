import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.css'
import  axios  from '../../../axios-orders';
import Spinner from './../../../Components/UI/Spinner/spinner';

class ContactData extends Component {
   state={
      name:'',
      email:'',
      address:{
         street:'',
         postalCode:''
      },
      loading: false
   }
   componentDidMount(){
      
   }

   orderHandler=(event)=>{
      event.preventDefault();
      console.log(this.props.ingredients);
       this.setState({loading:true});
            const order={
                  ingredients: this.props.ingredients,
                  price: this.props.price,
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

   render() {
      let form = (
      <form >
         <input className={classes.Input} type='text' name='name' placeholder="Your Name" />
         <input className={classes.Input} type='email' name='email' placeholder="Your Email" />
         <input className={classes.Input} type='text' name='street' placeholder="Your Name" />
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