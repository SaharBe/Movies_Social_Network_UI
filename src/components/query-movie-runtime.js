import React, { useState, useEffect } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';



export default function QueryRunTime(props){

    const options = ["RunTime less than X minutes",
                    "RunTime greater than X minutes"]

    const [movies, setMovies] = useState([]);
    const [option, setOption] = useState('');
    const [X,setX] =useState('');
    const [queryName, setQueryName]=useState('');
    const [temp, setTemp] = useState([]);


    const handleSelect=(e)=>{

        switch(e){
            case "RunTime less than X minutes":  setQueryName("runTimeSmallerThan") ;
            break;
            case "RunTime greater than X minutes": setQueryName("runTimeBiggerThan");
            break;
            default: setQueryName('');

        }
        setOption(e)
    }

    const handleInputChange=(event)=>{
        setX(event.target.value);
    }

    const SetQuery = ()  => {

        try{
            useEffect(()=>{
                if(X !== '' && queryName !== '' ){
        
                        const intervalId = setInterval(() => {
                
                            fetch(`http://localhost:8080/movies/query?query_name=${queryName}&user_id=${props.userID}&input=${X}`, {
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
                title={"Options: " + option}
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
                            placeholder="Enter X"
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