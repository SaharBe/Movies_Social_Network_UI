import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import MovieList from './movie-list'

export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(0);

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
          <div>{chosenFilter === 0 ? <MovieList userID={props.userID} movies={props.movies} /> : <div>hello</div>}</div>
          
          
        </div>
      );
    
    
}