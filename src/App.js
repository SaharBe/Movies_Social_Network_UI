import './App.css';
import React from 'react';
import Login from './components/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

function App() {

  const logoutUser = () => {
    window.location.href= '/';
  }

  return (
    
    <div>
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} transform={{ rotate: 30 }} />
          <span>Movies Social Network </span>
          <FontAwesomeIcon icon={faSignOutAlt} fixedWidth   size="xs" pull="right" transform="shrink-6 left-4 up-10"  className={'logout'} onClick={logoutUser} />
        </h1>  
      </header>
    <Router>
      
        <Route exact path={`/`} component={Login} />
    </Router>
    </div>
  );
}

export default App;
