import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


export default function QueryUserLike(props){

    const [valueOfAnotherUser,setValueOfAnotherUser] =useState('');

    const [movies, setMovies] = useState([]);


    const handleInputChange=(event)=>{
        setValueOfAnotherUser(event.target.value);
    }


    const SetQuery = ()  => {
       
        useEffect(()=>{
        if(valueOfAnotherUser !== '' ){

                const intervalId = setInterval(() => {
        
                    fetch(`http://localhost:8080/movies/query?query_name=byUserName&user_id=${props.userID}&input=${valueOfAnotherUser}`, {
                    method: 'GET',
                    header:{
                        'Content-Type': 'application/json'
                    }
                    })
                    .then(resp => resp.json())
                    .then(resp => setMovies(resp))
                    .catch( error => console.log(error) )
            
                }, 100)
            
                return () => clearInterval(intervalId); //This is important

            }
        },)   
        
    }




    return(
        <div>
            <Form>
                
                <div xs={4}>
                        <input 
                            className="form-control"
                            placeholder="Enter username"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                </div>
                
              <Button  variant="success" onClick={SetQuery()} >Choose feature</Button>{' '}
            </Form>

            <div>
            <h1>Similar List:</h1><MovieList userID={props.userID} movies={movies} />
            </div>
        </div>
    )  


}