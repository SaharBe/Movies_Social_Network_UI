import '../App.css';
import MovieList from './movie-list';
import MovieDetails from './movie-details';
import React, { useState, useEffect } from 'react';
import Login from './login';
import SearchBar from './search-bar';
import MainMenu from './main-menu';
import userId from './user-id';
function Mainscreen() {

   const [movies, setMovie] = useState([]);

  

  useEffect(()=>{
    fetch(`http://localhost:8080/Movies/4`, {
      method: 'GET',
      header:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch( error => console.log(error) )
  }, [])
    
 
  return (
    <div className="App">
      
       <div className="layout">
       <div>{userId.user_id}</div>
       <div>
       <h1>
       <SearchBar/>
       </h1>
        <MovieList  movies={movies} />
        </div>
        

       </div>
      
    </div>
  );
}

export default Mainscreen;
