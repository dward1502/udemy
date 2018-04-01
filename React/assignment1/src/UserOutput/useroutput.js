import React from 'react';
const style={
    name: {color: 'blue', fontSize: 32},
    pa:{color:'purple', fontSize:22,fontFamily:'Georgia'}
}
const useroutput = (props) => {
    return (
        <div>
            <p style={style.name}>Name: {props.username}</p>
            <p style={style.pa}>Woah i see this words</p>
        </div>
    );
};

export default useroutput;