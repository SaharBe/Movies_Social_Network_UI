import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import styled from 'styled-components';

const HoverText = styled.p`
    color: #FFFFFF;
    font-size: 30px;
    background-color: #808080;
    text-align: center;
    border-radius: 12px;
    :hover {
        background-color: #696969;
        cursor: pointer;
    }
 `

function MovieList(props){

    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }


    return (
        <div>
           
        <div>
          { props.movies && props.movies.map( movie =>{
            return (<div className='squre' key={movie.id}>
                        <h1>{movie.title}</h1>
                        <p>{movie.language}</p>
                        <p>{movie.budget}</p>
                        <p>{movie.runtime}</p>
                        <p>{movie.production_company}</p>
                        <p>{movie.number_of_likes}</p>
                        <FontAwesomeIcon icon={faHeart} />
                
                    </div>)
                
          })}
        </div>
        </div>)
}

export default MovieList


   // const [highlighted, setHighlighted] = useState(-1);
    
    // const highlightLike = high => evt =>{
    //     setHighlighted(high);
    // }
    
    // const [like, setLike] = useState([]);
    // const [likeActive, setLikeActive] = useState(false);

    // function likef(){
    //     if(likeActive){
    //         setLikeActive(false);
    //         setLike(like-1)
    //     }else{
    //         setLikeActive(true);
    //         setLike(like+1)
    //     }

    // }