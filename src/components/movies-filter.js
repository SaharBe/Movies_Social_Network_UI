import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyQuery from './query-similar-as';
import QueryUserLike from './query-user-like';
import QueryAllMovies from './query-all-movies';
import QueryRunTime from './query-movie-runtime';
import QueryMovieFeature from './query-movie-feature';

export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(0);


    return (
    <div>
        <p>The current filter: {chosenFilter}</p>
        <button onClick={() => setChosenFilter(0)}>
            All movies
        </button>
        <button onClick={() => setChosenFilter(1)}>
            Movies by feature
        </button>
        <button onClick={() => setChosenFilter(2)}>
            Movies that are identical in a certain feature to a certain movie
        </button>
        <button onClick={() => setChosenFilter(3)}>
            Movies according to a certain user
        </button>
        <button onClick={() => setChosenFilter(4)}>
            Movies according RunTime
        </button>
       
        <div>{props.userID}</div>
        
        <div>
        {(() => {
            switch (chosenFilter) {
            case 0:   return <div><QueryAllMovies userID={props.userID}/></div> ;
            case 1: return <div><QueryMovieFeature userID={props.userID}/></div>;
            case 2: return <div><MyQuery userID={props.userID}/></div>;
            case 3: return <div><QueryUserLike userID={props.userID}/></div>;
            case 4: return <div><QueryRunTime userID={props.userID}/></div>;
            default: return <div>de</div>;
            }
        })()}
        </div>
                
        
    </div>
    );
    
    
}