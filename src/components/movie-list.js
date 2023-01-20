import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
const LeftSide = styled.div`
  float: left;
  width: 33%;
  height: 90vh;
  padding: 10px;
  border: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`
const Middle= styled.div`
  float:left;
  width: 33%;
  min-height: 90vh;
  padding: 10px;
`

const RightSide = styled.div`
  float: left;
  width: 33%;
  height: 90vh;
  padding: 10px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`


function MovieList(props){

   
    function sendLikeChange(movieID, userID){
        API.sendLikeChange(movieID, userID);
    }


    return (
        <div>
            <div>
            {props.movies && props.movies !== null ? 
                <div>{props.movies.length}</div>
             :  <div>0</div>}
            </div>
           
        <div>
            
            <LeftSide>
               
            { props.movies && props.movies !== null && props.movies.map( (movie, i) =>{
            return (<div  key={movie.movieId} index={i}>
                         <div>{i%3 === 0? <div>
                            
                            <Table className='card'>
                                <thead>
                            
                                    <th><h1 >{movie.title}</h1></th>
                                    <th><h2>{movie.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(movie.movieId, props.userID)} className={movie.user_like === true ? 'red' : 'other'}/></h2></th>
                                
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h3>Production Company:</h3></td>
                                        <td><p>{movie.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{movie.production_company}</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Genre:</h3></td>
                                        <td><p>{movie.genres !== null ? movie.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Original language:</h3></td>
                                        <td><p>{movie.language}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Budget:</h3></td>
                                        <td><p>{movie.budget === 0 ?  <p>UNKNOWN</p> : <p>{movie.budget}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Revenue:</h3></td>
                                        <td><p>{movie.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{movie.revenue}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Runtime</h3></td>
                                        <td> <p>{movie.runtime === null ? <p>UNKNOWN</p> : <p>{movie.runtime} minutes</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p><h3>Movie ID:</h3></p>    
                                        </td>
                                        <td>
                                        <p>{movie.movieId}</p>
                                        </td>
                                    </tr>
                                <p>{props.userID}</p>
                                    
                                    
                                </tbody>
                            </Table>
                        </div> : <div></div>}</div>
                         
                    </div>)
                
          })}
       
        </LeftSide >

        </div>
        </div>)
        /* <Middle>
            { props.movies && props.movies !== null && props.movies.map( (movie, i) =>{
            return (<div  key={movie.movieId} index={i}>
                         <div>{i%3 === 1 ? <div>  
                            <Table className='card'>
                                <thead>
                            
                                    <th><h1 >{movie.title}</h1></th>
                                    <th><h2>{movie.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(movie.movieId, props.userID)} className={movie.user_like === true ? 'red' : 'other'}/></h2></th>
                                
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h3>Production Company:</h3></td>
                                        <td><p>{movie.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{movie.production_company}</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Genre:</h3></td>
                                        <td><p>{movie.genres !== null ? movie.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Original language:</h3></td>
                                        <td><p>{movie.language}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Budget:</h3></td>
                                        <td><p>{movie.budget === 0 ?  <p>UNKNOWN</p> : <p>{movie.budget}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Revenue:</h3></td>
                                        <td><p>{movie.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{movie.revenue}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Runtime</h3></td>
                                        <td> <p>{movie.runtime === null ? <p>UNKNOWN</p> : <p>{movie.runtime} minutes</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p><h3>Movie ID:</h3></p>    
                                        </td>
                                        <td>
                                        <p>{movie.movieId}</p>
                                        </td>
                                    </tr>
                                <p>{props.userID}</p>
                                    
                                    
                                </tbody>
                            </Table>
                        </div> : <div></div>}</div>
                         
                    </div>)
                
          })}

        </Middle>
            <RightSide>
            { props.movies && props.movies !== null && props.movies.map( (movie, i) =>{
            return (<div  key={movie.movieId} index={i}>
                         <div>{i%3 === 2 ? <div>
                            <Table className='card'>
                                <thead>
                            
                                    <th><h1 >{movie.title}</h1></th>
                                    <th><h2>{movie.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(movie.movieId, props.userID)} className={movie.user_like === true ? 'red' : 'other'}/></h2></th>
                                
                                    
                                
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h3>Production Company:</h3></td>
                                        <td><p>{movie.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{movie.production_company}</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Genre:</h3></td>
                                        <td><p>{movie.genres !== null ? movie.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Original language:</h3></td>
                                        <td><p>{movie.language}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Budget:</h3></td>
                                        <td><p>{movie.budget === 0 ?  <p>UNKNOWN</p> : <p>{movie.budget}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Revenue:</h3></td>
                                        <td><p>{movie.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{movie.revenue}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Runtime</h3></td>
                                        <td> <p>{movie.runtime === null ? <p>UNKNOWN</p> : <p>{movie.runtime} minutes</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p><h3>Movie ID:</h3></p>    
                                        </td>
                                        <td>
                                        <p>{movie.movieId}</p>
                                        </td>
                                    </tr>
                                <p>{props.userID}</p>
                                    
                                    
                                </tbody>
                            </Table>
                        </div> : <div></div>}</div>
                         
                    </div>)
                
          })}

        </RightSide> */
       

}

export default MovieList
