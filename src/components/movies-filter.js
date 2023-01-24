import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import MyQuery from './query-similar-as';
import QueryUserLike from './query-user-like';
import QueryRunTime from './query-movie-runtime';
import QueryMovieFeature from './query-movie-feature';
import QueryBests from './query-bests-movies';
import MovieList from './movie-list';
import QueryThreeParams from './query-three-params';
import UserList from './users-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';
export default function MoviesFilter(props){

    const [chosenFilter, setChosenFilter] = useState(-1);
    const lables = ["Movies with full detais",
                    "The top movies in...",
                    "Movies by The highest average of..",
                    "Movies by feature", 
                    "Movies that are identical in a certain feature to a certain movie",
                    "Movies according to a certain user",
                    "Movies according RunTime",
                    "The movies I liked", 
                    "Our Users List"] ;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setErr] = useState(''); 
    
    const [myLikedMovies, setMyLikedMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const handleClick = async () => {
        setIsLoading(true);
        setChosenFilter(7);

        try{

            const response = await fetch(`http://localhost:8080/movies/query?query_name=byUserName&user_id=${props.userID}&input=${props.user_name}`, {
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

            setMyLikedMovies(result);


        }catch(err){
            setErr(err.message);
            return error;
        }finally {
            setIsLoading(false);
            return isLoading;
        }


    }

    const handleUsersClick = async () => {
        setIsLoading(true);
        setChosenFilter(8);

        try{

            const response = await fetch("http://localhost:8080/users", {
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

            setUsers(result);
            console.log(users)

        }catch(err){
            setErr(err.message);
        }finally {
            setIsLoading(false);
        }


    }

    const handleAllClick = async () => {
        setChosenFilter(0);
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

            setAllMovies(result);


        }catch(err){
            setErr(err.message);
        }finally {
            setIsLoading(false);
        }

    }



    return (
    <div>
        <div>
            <h3>Hello, {props.user_name}</h3>
           
        </div>

        <ToggleButtonGroup  type="radio" name="options" >
        <ToggleButton  id="tbg-radio-1" value={1} variant="light" onClick={handleAllClick}>
        {lables[0]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-2" value={2} variant="light" onClick={() => setChosenFilter(1)}>
        {lables[1]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-3" value={3} variant="light" onClick={() => setChosenFilter(2)}>
        {lables[2]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-4" value={4} variant="light" onClick={() => setChosenFilter(3)}>
        {lables[3]}
        </ToggleButton>
        <ToggleButton id="tbg-radio-5" value={5} variant="light" onClick={() => setChosenFilter(4)}>
        {lables[4]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-6" value={6} variant="light" onClick={() => setChosenFilter(5)}>
        {lables[5]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-7" value={7} variant="light" onClick={() => setChosenFilter(6)}>
        {lables[6]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-8" value={8} variant="info" onClick={handleClick}> 
        {lables[7]}
        </ToggleButton>
        <ToggleButton  id="tbg-radio-9" value={9} variant="info" onClick={handleUsersClick}>
        {lables[8]}
        </ToggleButton>
        </ToggleButtonGroup >

      
       
  
        <div style={{margin:"20px"}}>
           
        {(() => {
            switch (chosenFilter) {
            case 0: return <div><MovieList userID={props.userID} movies={allMovies} /></div>
            case 1: return <div><QueryBests userID={props.userID}/></div>;
            case 2: return <div><QueryThreeParams userID={props.userID}/></div>;
            case 3: return <div><QueryMovieFeature userID={props.userID}/></div>;
            case 4: return <div><MyQuery userID={props.userID}/></div>;
            case 5: return <div><QueryUserLike userID={props.userID}/></div>;
            case 6: return <div><QueryRunTime userID={props.userID}/></div>;
            case 7: return <div><MovieList userID={props.userID} movies={myLikedMovies} /></div>
            case 8: return <div><UserList users={users}></UserList></div>
            default: return <div>
                                <h2>Welcome {props.user_name}!</h2>
                                <h2>Select a filter  <FontAwesomeIcon icon={faSmileBeam} size="m" className='other'/></h2> 
                                   
                            </div>
            }
        })()}
            
                
        </div>
    </div>
    );
    
    
}