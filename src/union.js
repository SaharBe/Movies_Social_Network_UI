import React, { useState } from "react";
import UserId from './user-id'
import MoviesFilter from './components/movies-filter';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { API } from "./rest-api-service";
export default function Union(props){

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { globalVariable, setGlobalVariable } = React.useContext(UserId);

    // const [userRequest, setUserRequest] = useState([]);

   // User Login info
    const database = [
    {
        username: "user1",
        password: "pass1",
        user_id: "4"
    },
    {
        username: "user2",
        password: "pass2",
        user_id: "3"
    },
    {
        username: "junebug73",
        password: "OHe6oMjK",
        user_id: "2"
    }
    ];

    const errors = {
    uname: "invalid username",
    pass: "invalid password"
    };

 

    const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    
    let a = API.sendUserData(uname.value, pass.value);
   console.log(a)

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);

        setGlobalVariable(userData.user_id)
        console.log(globalVariable.value)

      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
          
        </div>

        <button className="signup">Create a new account</button>
      </form>
    </div>
  );

//   /////////////////////////////////////////////////////////////////////

  const logoutUser = () => {
    window.location.href= '/';
  }
 
  return(
    <div>
        <div>
        <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} transform={{ rotate: 30 }} />
          <span>Movies Social Network </span>
          <FontAwesomeIcon icon={faSignOutAlt} fixedWidth   pull="right"   className={'logout'} onClick={logoutUser} />
        </h1>  
      </header> 
        </div>
\
    <div className="App">
        { parseInt(globalVariable) === 0 ?   
        <div className="App">
        <div className="title">Sign In</div>
       
        {isSubmitted ? <div>{globalVariable}</div> : renderForm }
         
      </div> :   <div>
                    <div className="App">
                    <div >
                    <MoviesFilter userID={globalVariable} />
                    <div>{globalVariable}</div>
                
                    </div>
                    </div>
                </div>
          }     
    </div>
    </div>
   
  )

}