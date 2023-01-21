import React, { useState } from "react";
import UserId from './user-id'
import MoviesFilter from './components/movies-filter';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { API } from "./rest-api-service";
export default function Union(props){

    // React States
    const [errorMessages, setErrorMessages] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { globalVariable, setGlobalVariable } = React.useContext(UserId);

    // const [userRequest, setUserRequest] = useState('');
    let x;
    var y;
    let regex = /\d+/;

   // User Login info
    // const database = [
    // {
    //     username: "user1",
    //     password: "pass1",
    //     user_id: "4"
    // },
    // {
    //     username: "user2",
    //     password: "pass2",
    //     user_id: "3"
    // },
    // {
    //     username: "junebug73",
    //     password: "OHe6oMjK",
    //     user_id: "2"
    // }
    // ];

    // const errors = {
    // uname: "invalid username",
    // pass: "invalid password"
    // };

 

    const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    //const userData = database.find((user) => user.username === uname.value);

    
    API.sendUserData(uname.value, pass.value).then(data => {
      x =data;
      console.log(x); // the resolved value is logged to the console

      if(x === undefined){
        console.log("Dor");
        setErrorMessages('User name or password are incorrect')
      }

      if (regex.test(x)) {
        console.log("The string contains a number as a substring");
      } else {
          console.log(typeof(x));
          // if (typeof(Object.entries(x)[0][0]) !== "number"){
          //   const v = Object.entries(x)[0][1];
          //   console.log(Object.entries(x)[0][1]);
          //   console.log(v);
          // }
          if(Object.entries(x).find(entry => typeof(entry[1]) === "number")) {
            console.log(Object.entries(x)[1]);
            console.log("shabat shalom");
            y =  Object.entries(x)[0][1];
            console.log(y);
            console.log("shabat shalom");
            setGlobalVariable(y);
            setIsSubmitted(true);
          
          } else {
            console.log("The object does not contain the string 'John Doe'");
            setErrorMessages('User name or password are incorrect')
          }
      }

      
    });

    
    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //    // setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     //setIsSubmitted(true);
    //     // console.log(y)
    //     // setGlobalVariable(userData.user_id)
    //   }
    // } else {
      // Username not found
      //setErrorMessages({ name: "uname", message: errors.uname });
    //}
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    //name === errorMessages.name && (
      <div className="error">{errorMessages}</div>
    //);

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {/* {renderErrorMessage("uname")} */}
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