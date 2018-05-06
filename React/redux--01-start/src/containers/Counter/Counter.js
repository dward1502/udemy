import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.props.onIncrementCounter( 'inc' )} />
                <CounterControl label="Decrement" clicked={() => this.props.onDecerease( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddFive( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubFive( 'sub', 5 )}  />
                <hr/>
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult =>(
                        
                        <li onClick={()=> this.props.onDeleteResult(strResult.id)}>{strResult}</li>
                        
                    ))}
                </ul>
            </div>
        );
    }
}
//can define what slice of a state you want to get and what actions you would like to take
const mapStateToProps = state =>{
    return{
        ctr: state.counter,
        storedResults: state.results
    };
};
const mapDispatchStateToProps = dispatch =>{
    return {
        onIncrementCounter :()=> dispatch({type: actionTypes.INCREMENT}),
        onDecerease: () => dispatch({ type: actionTypes.DECREMENT}),
        //passing a payload allows you to pass data down to reducer
        onAddFive: () => dispatch({ type: actionTypes.ADDFIVE, val: 5}),
        onSubFive: () => dispatch({ type: actionTypes.SUBFIVE, val:5}),
        onStoreResult: () => dispatch({ type: actionTypes.STORE_RESULT}),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultID: id }),
    };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(Counter);