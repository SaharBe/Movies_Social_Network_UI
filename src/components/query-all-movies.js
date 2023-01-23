import React, { useState, useEffect } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default function QueryAllMovies(props){


    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('movieBasicQuery');

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');


    const handleClick = async () => {
        setIsLoading(true);


        try{
            

            const response = await fetch(`http://localhost:8080/movies/query-no-input?user_id=${props.userID}&query_name=movieBasicQuery`, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                },
            });

            

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));

            setMovies(result);


        }catch(err){
            setErr(err.message);
        }finally {
            setIsLoading(false);
        }

    }

  
    return(
        <div>
             <Button  variant="success" onClick={handleClick} >Click!</Button>
           <MovieList userID={props.userID} movies={movies} />
        </div> 
    )
    

}