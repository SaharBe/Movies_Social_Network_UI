import React, { useState, useEffect } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


export default function QueryMovieFeature(props){

    const moviesFeatures  = ["Language","Production Company", "Genre", "Title / KeyWord"];


    const [movies, setMovies] = useState([]);
    const [valueOfFeature,setValueOfFeature]=useState('');
    const [queryName, setQueryName]=useState('');
    const [ input, setInput] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');


    const handleSelect=(e)=>{

        switch(e){
            case "Language":  setQueryName("byLanguage") ;
            break;
            case "Production Company": setQueryName("byCompany");
            break;
            case "Genre": setQueryName("byGenre");
            break;
            case "Title / KeyWord": setQueryName("movieNameContainsOrKeyword");
            break;
            default: setQueryName('');

        }
        setValueOfFeature(e)
    }

    const handleInputChange=(event)=>{
        setInput(event.target.value);
    }


    const handleClick = async () => {
        setIsLoading(true);

        try{
            

            const response = await fetch(`http://localhost:8080/movies/query-like?query_name=${queryName}&user_id=${props.userID}&input=${input}`, {
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


    };



    return(
        <div>
            <div>{valueOfFeature}</div>
            <div>{input}</div>
            <Form>
                <DropdownButton 
                className='mr-1'
                type='text'
                title={"Similar by: " + valueOfFeature}
                variant="success"
                onSelect={handleSelect}
                >
                  {moviesFeatures.map(movieField => {
                    return(
                      <Dropdown.Item eventKey={movieField}>{movieField}</Dropdown.Item>)
                  })}
                </DropdownButton>

                <div xs={4}>
                        <input 
                            className="form-control"
                            placeholder={"Enter " + valueOfFeature}
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                </div>
                
              <Button  variant="success" onClick={handleClick} >Choose feature</Button>{' '}
            </Form>

            <div>
                {queryName ==='' || input === '' ? <div><h3>Waiting for a filter option to be selected...</h3></div> :  <MovieList userID={props.userID} movies={movies} /> }
            </div>
        </div>
    )  

}