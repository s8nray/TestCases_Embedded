
import React from 'react'
import Header from '../components/header';
import AddProject from '../components/addProject';

import "../App.css";


class InitialScreen extends React.Component {

  state={

  }

  constructor(props) {
    super(props)
  }

  

  render() {
    return (
      <>
        <Header />

        <AddProject />

      
        
      </>
    );
  }
}


export default InitialScreen;