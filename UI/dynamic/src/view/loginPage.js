import React from 'react'
import reactDom from 'react-dom';
import Header from '../components/header';
import Login from '../components/login'

class LoginPage extends React.Component{
   
      render() {
        return (
          <>
            <Login />
          </>
        );
      }
}

export default LoginPage