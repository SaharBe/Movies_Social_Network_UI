
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'



function MovieDetails(props){


    return (
        <div> 
            {props.movie ? (
                <div>
                     <h1>{props.movie.movieID}</h1>  
                     <p>{props.movie.title}</p> 
                     <p>{props.movie.movieID}</p>
                     <FontAwesomeIcon icon={faHeart}/>

                </div>
            ): null}      
        </div>
    )
}

export default MovieDetails

