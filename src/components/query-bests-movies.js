import React, { useState } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';


export default function QueryBests(props){

    const options  = ["Top 1000 most Liked movies","1000 movies with the longest title", "Most profit for every language", "Most profit for every company"];
    const [movies, setMovies] = useState([]);
    const [queryName, setQueryName]=useState('');
    const [option, setOption] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleSelect=(e)=>{

        switch(e){
            case options[0] :  setQueryName("allMoviesOrderedByLikes") ;
            break;
            case options[1]: setQueryName("allMoviesOrderedByNameLength");
            break;
            case options[2]: setQueryName("mostProfitForEveryLanguage");
            break;
            case options[3]: setQueryName("mostProfitForEveryCompany");
            break;
            default: setQueryName('');

        }
        setOption(e)
    }

    const handleClick = async () => {
        setIsLoading(true);

        try{
            

            const response = await fetch(`http://localhost:8080/movies/query-no-input?user_id=${props.userID}&query_name=${queryName}`, {
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


        }catch(error){
            setErr(error.message);
            return err;
        }finally {
            setIsLoading(false);
            return isLoading;
        }


    };


    return(
        <div>
           
            <Form>
                <DropdownButton 
                className='mr-1'
                type='text'
                title={"Best in..: " + option}
                variant="success"
                onSelect={handleSelect}
                >
                  {options.map(options => {
                    return(
                      <Dropdown.Item eventKey={options}>{options}</Dropdown.Item>)
                  })}
                </DropdownButton>
                
              <Button  variant="success" onClick={handleClick} >Choose feature</Button>{' '}
            </Form>

            <div>
                {queryName ===''  ? <div><h3>Waiting for a filter option to be selected...</h3></div> :  <MovieList userID={props.userID} movies={movies} /> }
            </div>
        </div>
    )  


}