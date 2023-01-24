import React, { useState } from "react";
import UserId from './user-id'
import MoviesFilter from './components/movies-filter';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { API } from "./rest-api-service";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export default function Union(props){

    // React States
    const [errorMessages, setErrorMessages] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { globalVariable, setGlobalVariable } = React.useContext(UserId);
    const  [gVariable, setGVariable] =  useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setPassword] = useState('');

    const [errorMessageNewUser, setErrorMessageNewUser] = useState('');

    const handleInputNewUsernameChange=(event)=>{
      setNewUsername(event.target.value);
    }

    const handleInputNewPasswordChange=(event)=>{
      setPassword(event.target.value);
    }


    const handleRegistring = () => {

      if(newUsername !== '' && newPassword !== ''){
          API.createNewUser(newUsername, newPassword).then(data =>{
         
          if(data === 404){
            setErrorMessageNewUser("User creation failed, user name already exists")
          }else{
            setErrorMessageNewUser('');
            setShow(false)
          }
        })
      }
      
    }

    let x;
    var y;
    var yy;
    let regex = /\d+/;

    const handleSubmit = (event) => {
  
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    
    API.sendUserData(uname.value, pass.value).then(data => {
      x =data;
      console.log(x); // the resolved value is logged to the console

      if(x === undefined){
        // console.log("Dor");
        setErrorMessages('User name or password are incorrect')
      }

      if (regex.test(x)) {
        //console.log("The string contains a number as a substring");
      } else {
          console.log(typeof(x));

          if(Object.entries(x).find(entry => typeof(entry[1]) === "number")) {
            console.log(Object.entries(x)[1]);
            console.log("shabat shalom");
            y =  Object.entries(x)[0][1];
            console.log(y);
            yy = Object.entries(x)[1][1];
            console.log(yy);
            console.log("shabat shalom");
            setGlobalVariable(y);
            setGVariable(yy);
            setIsSubmitted(true);
          
          } else {
           // console.log("The object does not contain the string 'John Doe'");
            setErrorMessages('User name or password are incorrect')
          }
      }

      
    });


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

        
      </form>
      <button className="signup" onClick={handleShow}>Create a new account</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                autoFocus
                placeholder="Enter username"
                type="text"
                onChange={handleInputNewUsernameChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control 
                autoFocus
                placeholder="Enter password"
                type="password"
                onChange={handleInputNewPasswordChange}
              />
            </Form.Group>
            <div className="error">{errorMessageNewUser}</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegistring}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

//   /////////////////////////////////////////////////////////////////////

  const logoutUser = () => {
    window.location.href= '/';
  }
 
  return(
    <div className="App">
        <div>
        <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} transform={{ rotate: 30 }} />
          <span>Movies Social Network </span>
          <FontAwesomeIcon icon={faSignOutAlt} fixedWidth   pull="right"   className={'logout'} onClick={logoutUser} />
        </h1>  
      </header> 
        </div>

    <div className="App">
        { parseInt(globalVariable) === 0 ?   
        <div className="App">
        <div className="title">Sign In</div>
       
        {isSubmitted ? <div>{globalVariable}</div> : renderForm }
         
      </div> :   <div>
                    <div className="App">
                    <div className="App">
                    <MoviesFilter userID={globalVariable} user_name={gVariable} />
                    {/* <div>{globalVariable}</div> */}
                
                    </div>
                    </div>
                </div>
          }     
    </div>
    </div>
   
  )

}