import React, {Component} from 'react';
import Modal from './../../Components/UI/Modal/Modal';

const withErroHandler = (WrappedComponent, axios) => {
   return class extends Component{
      state = {
         error: null
      }
      componentWillMount (){
         this.reqIntercept = axios.interceptors.request.use(req =>{
            this.setState({error:null});
            return req;
         });
         this.resIntercept = axios.interceptors.response.use(res => (res,error) =>{
           this.setState({error:error});
           
         });
      }
      componentWillUnmount(){
         // console.log("Will Unmount", this.reqIntercept, this.resIntercept);
         axios.interceptors.request.eject(this.reqIntercept);
         axios.interceptors.response.eject(this.resIntercept);
      }

      errorConfirmedHandler = () => {
         this.setState({error:null});
      }
      render(){
         return (
            <div>
               <Modal show={this.state.error}
               modalClosed={this.errorConfirmedHandler}>
               {this.state.error ? this.state.error.message : null}
               </Modal>
               <WrappedComponent {...this.props} />
            </div>
         );
      }
   }
};

export default withErroHandler;