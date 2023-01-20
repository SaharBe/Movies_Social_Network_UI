import React, { useState, useEffect } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function QueryAllMovies(props){


    const [movies, setMovie] = useState([]);

    try{
        useEffect(()=>{

       

            const intervalId = setInterval(() => {
        
                fetch(`http://localhost:8080/movies/query-no-input?user_id=${props.userID}&query_name=movieBasicQuery`, {
                method: 'GET',
                header:{
                    'Content-Type': 'application/json'
                }
                })
                .then(resp => resp.json())
                .then(resp => setMovie(resp))
                .catch( error => console.log(error) )
        
            }, 100)
        
            return () => clearInterval(intervalId); //This is important
        
          },)
            
    }catch(error){
        return console.log(error);
    }
  
    return(
        <div>
            <h1>This is The list of all movies:</h1><MovieList userID={props.userID} movies={movies} />
        </div> 
    )
    





}