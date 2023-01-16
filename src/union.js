import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserId from './user-id'
import MovieList from './components/movie-list';
import SearchBar from './components/search-bar';
import "./components/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
export default function Union(props){

    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { globalVariable, setGlobalVariable } = React.useContext(UserId);
  // const { globalVariable, setGlobalVariable } = React.useContext(UserId);
  // const [globalVariable, setGlobalVariable] = React.useState("init");

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

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        // obj.user_id =  userData.user_id
        // Object.freeze(obj.user_id)
        // console.log(obj.user_id )
        // console.log(`${userId}`)
        // setGlobalVariable(userData.user_id)
        setGlobalVariable(userData.user_id)
        console.log(globalVariable.value)
        // window.location.href = `/movies/`
       
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
      </form>
    </div>
  );

//   /////////////////////////////////////////////////////////////////////

  const [movies, setMovie] = useState([]);
  //  const { globalVariable, setGlobalVariable } = React.useContext(UserId);
//   const { globalVariable, setGlobalVariable } = React.useContext(UserId);
  //  const num = "4"
  //  userId.userId_ = 4;

 
  // Object.freeze(userId);

  // userId.prop = 3;

  // console.log(UserId)

  useEffect(()=>{
    fetch(`http://localhost:8080/Movies/${globalVariable}`, {
      method: 'GET',
      header:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch( error => console.log(error) )
  }, [])
    

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
          <FontAwesomeIcon icon={faSignOutAlt} fixedWidth   size="xs" pull="right" transform="shrink-6 left-4 up-10"  className={'logout'} onClick={logoutUser} />
        </h1>  
      </header> 
        </div>
    <div className="App">
        <div className="layout"></div>
        { parseInt(globalVariable) === 0 ?   
        <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>{globalVariable}</div> : renderForm}
      </div> :   <div>
                    <div className="App">
                    <div className="layout">
                    <div>{globalVariable}</div>
                    <div>
                        <h1>
                        <SearchBar/>
                        </h1>
                            <MovieList  movies={movies} />
                            </div>
                    </div>
                    </div>
                </div>
          }     
    </div>
    </div>
   
  )

}