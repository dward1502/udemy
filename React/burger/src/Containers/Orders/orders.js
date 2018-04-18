import React, { Component } from 'react';
import Order from '../../Components/Order/order';
import axios from '../../axios-orders';

class orders extends Component {
   state={
      orders:[],
      loading:true
   }


   componentDidMount(){
      axios.get('/orders.json').then(res =>{
         const fetched = [];
         for( let key in res.data){
            fetched.push({
               ...res.data[key],
               id: key
            });
         }
         this.setState({
            loading: false,
            orders: fetched
         });
      }).catch(err =>{
         this.setState({
            loading:false
         })
      })
   }

   render() {
      return (
         <div>
           {this.state.orders.map(order =>{
               return <div key={order.id}>
            <Order
            ingredients={order.ingredients}
            price={order.price}/>
            </div>
           })}
         </div>
      );
   }
}

export default orders;