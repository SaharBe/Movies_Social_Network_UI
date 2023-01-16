import '../App.css';
import MovieList from './movie-list';
import MovieDetails from './movie-details';
import React, { useState, useEffect } from 'react';
import Login from './login';
import SearchBar from './search-bar';
import MainMenu from './main-menu';
import UserId from '../user-id'

// import UserId from '../user-id';
function Mainscreen(props) {

  const [movies, setMovie] = useState([]);
  //  const { globalVariable, setGlobalVariable } = React.useContext(UserId);
  // const { globalVariable, setGlobalVariable } = React.useContext(UserId);
  //  const num = "4"
  //  userId.userId_ = 4;

 
  // Object.freeze(userId);

  // userId.prop = 3;

  // console.log(UserId)

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
       <div>fff</div>
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
