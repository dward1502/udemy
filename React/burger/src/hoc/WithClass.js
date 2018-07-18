import React from 'react';

const WithClass = (props) => {
    <div className={props.classes}>
        {props.children}
    </div>
};

export default WithClass;

// can wrap around class / const that need a class on the higher div that wraps the return and passes the css classname down as a prop


// import React from 'react';

// const WithClass = (WrappedComponent, className) => {
 //   return (props) =>(
//     <div className={className}>
//         <WrappedComponent {...props} />
//     </div>
 //   )

// };

// export default WithClass;