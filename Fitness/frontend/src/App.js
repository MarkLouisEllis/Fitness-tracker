import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import React, { useState } from 'react';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Login from './components/Login';
import About from './components/About';
import './mycss.css';

//used to check if user has logged in with the createcontext hook. The email,password and admin state is stored in Credential Context
//The provider wrapped around all components at the top level to allows us to use credential state in multiple components. 

export const CredentialsContext = React.createContext();

function  App() {
  
  //state for credentialscontext
  const credentialsState = useState(null);

  return (
    <CredentialsContext.Provider value ={credentialsState}>
      <div className="App">
      <link
           rel="stylesheet"
           href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
           integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
           crossorigin="anonymous"/>

        <Router>
          <Switch>
            <Route exact path ='/'><Welcome/></Route>
            <Route exact path ='/Signup'><Signup/></Route>
            <Route exact path ='/Login'><Login/></Route>
            <Route exact path ='/About'><About/></Route>
          </Switch>
        </Router>
      </div>
    </CredentialsContext.Provider>  
  );
}

export default App;
