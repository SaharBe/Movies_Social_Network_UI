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

export default function MyQuery(props){

    const moviesFeatures  = ["Language","Title","Production Company"];
    const [movies, setMovies] = useState([]);

    const [valueOfFeature,setValueOfFeature]=useState('');
    const [valueOfMovieID,setValueOfMovieID]=useState('');
    const [queryName, setQueryName]=useState('');
   

    const handleSelect=(e)=>{

        switch(e){
            case "Language":  setQueryName("similarByLanguage") ;
            break;
            case "Production Company": setQueryName("similarByCompany");
            break;
            default: setQueryName('');

        }
        setValueOfFeature(e)
    }

    const handleInputChange=(event)=>{
        setValueOfMovieID(event.target.value);
    }

    const SetQuery = ()  => {
       
        useEffect(()=>{

            if(queryName !=='' && valueOfMovieID !== '' ){

                const intervalId = setInterval(() => {
        
                    fetch(`http://localhost:8080/movies/query?query_name=${queryName}&user_id=${props.userID}&input=${valueOfMovieID}`, {
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
                <DropdownButton 
                className='mr-1'
                type='text'
                title={"Similar by: " + valueOfFeature}
                variant="success"
                onSelect={handleSelect}
                >
                  {moviesFeatures.map(movieField => {
                    return(
                      <Dropdown.Item eventKey={movieField}>{movieField}</Dropdown.Item>)
                  })}
                </DropdownButton>

                <Col xs={4}>
                        <input 
                            className="form-control"
                            placeholder="movie id"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                </Col>
                
              <Button  variant="success" onClick={SetQuery()} >Choose feature</Button>{' '}
            </Form>

            <div>
            <h1>Similar List:</h1><MovieList userID={props.userID} movies={movies} />
            </div>
        </div>
    )  

}

