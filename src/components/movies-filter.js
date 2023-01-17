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
import { Form } from 'react-bootstrap';

export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(0);


    const moviesFeatures  = ["Language","Title","Production Company"];

    const [value,setValue]=useState('');

    const handleSelect=(e)=>{
        setValue(e)
    }


    const setModeCommand = props => evt => {

        //API.sendToDrone(droneName, value, 0, token)
        alert(evt)
      
  }


    const filterForMovies = [
        {
            filter: "noFilter",
            filter_id: "1"
        },
        {
          filter: "similarAsMovieId",
          parameter_one: "movieId",
          parameter_two: "moviField", //lang or company
          filter_id: "2"
        },
        
      ];

    
      return (
        <div>
           <p>The current filter: {chosenFilter}</p>
          <button onClick={() => setChosenFilter(0)}>
            filter zero 
          </button>
          <button onClick={() => setChosenFilter(1)}>
            filter one 
          </button>
          <div>{props.userID}</div>
          <div>
          
      </div>
         
      <Form>
            {/* <Form.Row> */}
              
                {/* <DropdownButton 
                className='mr-1'
                type='text'
                title={"set mode: " + value}
                variant="success"
                onSelect={handleSelect}
                >
                  {moviesFeatures.map(mode => {
                    return(
                      <Dropdown.Item eventKey={mode}>{mode}</Dropdown.Item>)
                  })}
                </DropdownButton>
                
              <Button  variant="success" onClick={setModeCommand()} >SEND</Button>{' '} */}
            {/* </Form.Row> */}
        </Form>
          <div>
            {(() => {
                switch (chosenFilter) {
                case 0:   return <div><h1>This is The list of all movies:</h1><MovieList userID={props.userID} movies={props.movies} /></div> ;
                case 1: return <div>by</div>;
                default: return <div>de</div>;
                }
            })()}
            </div>
                
          
        </div>
      );
    
    
}