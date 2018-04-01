import React from 'react';
import './input.css';

const userinput = (props) => {
    return (
        <div>
            <input type="text" onChange={props.change} value={props.placeholder}/>
        </div>
    );
};

export default userinput;