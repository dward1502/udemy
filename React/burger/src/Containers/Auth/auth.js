import React, { Component } from 'react';
import {  } from "../../Components/UI/";

class auth extends Component {
   
   state={
      controls:{
         email:{
            elementType: 'input',
            elementConfig:{
               type:'email',
               placeholder:'Your Email'
            },
            value: '',
            validation:{
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Your Password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      }
   }
   
   render() {
      return (
         <div>
            <form>

            </form>
         </div>
      );
   }
}

export default auth;