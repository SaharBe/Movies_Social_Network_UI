
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

 // const [highlighted, setHighlighted] = useState(-1);
    
    // const highlightLike = high => evt =>{
    //     setHighlighted(high);
    // }
    
    // const [like, setLike] = useState(100);
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


                     {/* <FontAwesomeIcon icon={faHeart} size="2x"   className={likeActive  > 0  || highlighted > 0 ? 'red' : 'other'}
                        onMouseEnter={highlightLike(1)}
                        onMouseLeave={highlightLike(-1)}
                        onClick={likef}
                     />
                     {like}
     */}