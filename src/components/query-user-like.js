import React, { useState, useEffect } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


export default function QueryUserLike(props){

    const options  = ["All movies User Liked",
                    "All movies from the Company that User liked the most", 
                    "All movies from the Genre that User liked the most",
                    "All movies  with Average Runtime User liked the moste"];

    const [movies, setMovies] = useState([]);
    const [option, setOption] = useState('');
    const [valueOfAnotherUser,setValueOfAnotherUser] =useState('');
    const [queryName, setQueryName]=useState('');


    const handleSelect=(e)=>{

        switch(e){
            case "All movies User Liked":  setQueryName("byUserName") ;
            break;
            case "All movies from the Company that User liked the most": setQueryName("moviesUserXLikedMostByCompany");
            break;
            case "All movies from the Genre that User liked the most": setQueryName("moviesUserXLikedMostByGenre");
            break;
            case "All movies  with Average Runtime User liked the moste": setQueryName("moviesUserXLikedByRuntimeAverage")
            break;
            default: setQueryName('');

        }
        setOption(e)
    }

    
    const handleInputChange=(event)=>{
        setValueOfAnotherUser(event.target.value);
    }


    const SetQuery = ()  => {

        try{

            useEffect(()=>{
                if(valueOfAnotherUser !== '' && queryName !== '' ){
        
                        const intervalId = setInterval(() => {
                
                            fetch(`http://localhost:8080/movies/query?query_name=${queryName}&user_id=${props.userID}&input=${valueOfAnotherUser}`, {
                            method: 'GET',
                            header:{
                                'Content-Type': 'application/json'
                            }
                            })
                            .then(resp => resp.json())
                            .then(resp => setMovies(resp))
                            .catch( error => console.log(error) )
                    
                        }, 100)
                    
                        return () => clearInterval(intervalId); //This is important
        
                    }
                },)   

        }catch(error){
            return console.log(error);
        }
       
       
        
    }




    return(
        <div>
            <Form>

            <DropdownButton 
                className='mr-1'
                type='text'
                title={"Options: " +option}
                variant="success"
                onSelect={handleSelect}
                >
                  {options.map(movieField => {
                    return(
                      <Dropdown.Item eventKey={movieField}>{movieField}</Dropdown.Item>)
                  })}
                </DropdownButton>
                
                <div xs={4}>
                        <input 
                            className="form-control"
                            placeholder="Enter username"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                </div>
                
              <Button  variant="success" onClick={SetQuery()} >Choose feature</Button>{' '}
            </Form>

            <div>
            <h1>Similar List:</h1><MovieList userID={props.userID} movies={movies} />
            </div>
        </div>
    )  


}