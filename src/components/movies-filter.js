import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyQuery from './query';
 

export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(0);


 
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
            {(() => {
                switch (chosenFilter) {
                case 0:   return <div><h1>This is The list of all movies:</h1><MovieList userID={props.userID} movies={props.movies} /></div> ;
                case 1: return <div><MyQuery userID={props.userID}/></div>;
                default: return <div>de</div>;
                }
            })()}
            </div>
                    
          
        </div>
      );
    
    
}