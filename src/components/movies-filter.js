import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import MyQuery from './query-similar-as';
import QueryUserLike from './query-user-like';
import QueryAllMovies from './query-all-movies';
import QueryRunTime from './query-movie-runtime';
import QueryMovieFeature from './query-movie-feature';

export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(0);
    const lables = ["All movies",
                    "Movies by feature", 
                    "Movies that are identical in a certain feature to a certain movie",
                    "Movies according to a certain user",
                    "Movies according RunTime"] ;


    return (
    <div>

        <ToggleButtonGroup  type="radio" name="options" defaultValue={1}>
        <ToggleButton  id="tbg-radio-1" value={1} variant="dark" onClick={() => setChosenFilter(0)}>
        {lables[0]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-2" value={2} variant="dark" onClick={() => setChosenFilter(1)}>
        {lables[1]}
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3} variant="dark" onClick={() => setChosenFilter(2)}>
        {lables[2]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-4" value={4} variant="dark" onClick={() => setChosenFilter(3)}>
        {lables[3]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-5" value={5} variant="dark" onClick={() => setChosenFilter(4)}>
        {lables[4]}
        </ToggleButton>
        </ToggleButtonGroup >
       
  
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