import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email,pasword) => {}
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{isLoggedIn:isLoggedIn,
onLogin:}}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
