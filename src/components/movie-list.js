import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table'


const HoverText = styled.p`
    color: #FFFFFF;
    font-size: 30px;
    background-color: #808080;
    text-align: center;
    border-radius: 12px;
    :hover {
        background-color: #696969;
        cursor: pointer;
    }
 `

function MovieList(props){

    // const movieClicked = movie => evt => {
    //     props.movieClicked(movie)
    // }
    // const styles = StyleSheet.create({
    //     bold: {fontWeight: 'bold'},
    //     italic: {fontStyle: 'italic'},
    //     underline: {textDecorationLine: 'underline'}
    // })

    const shoot = () => {
        alert("Great Shot!");
    }
    
    return (
        <div>
           
        <div>
          { props.movies && props.movies.map( movie =>{
            return (<div  key={movie.movieId}>
                       
                        <Table className='card'>
                            <thead>
                                <th><h1 >{movie.title}</h1></th>
                                <th><h2>{movie.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={shoot} className={movie.user_like === "true" ? 'red' : 'other'}/></h2></th>
                                
                            </thead>
                            <tbody>
                                <tr>
                                    <td><h3>Production Company:</h3></td>
                                    <td><p>{movie.production_company}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Original language:</h3></td>
                                    <td><p>{movie.language}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Budget:</h3></td>
                                    <td><p>{movie.budget === 0 ?  <p><FontAwesomeIcon icon={faX}/></p> : <p>{movie.budget}</p>}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Revenue:</h3></td>
                                    <td><p>{movie.revenue === 0.0 ?  <p><FontAwesomeIcon icon={faX}/></p> : <p>{movie.revenue}</p>}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>Runtime</h3></td>
                                    <td> <p>{movie.runtime === null? <p><FontAwesomeIcon icon={faX}/></p> : <p>movie.runtime</p>}</p></td>
                                </tr>

                                <p>{movie.user_like === "true" ? <p>I like it!</p> : <p>not liked</p>}</p>
                                
                            </tbody>
                        </Table>
                    </div>)
                
          })}
        </div>
        </div>)
}

export default MovieList


   // const [highlighted, setHighlighted] = useState(-1);
    
    // const highlightLike = high => evt =>{
    //     setHighlighted(high);
    // }
    
    // const [like, setLike] = useState([]);
    // const [likeActive, setLikeActive] = useState(false);

    // function likef(){
    //     if(likeActive){
    //         setLikeActive(false);
    //         setLike(like-1)
    //     }else{
    //         setLikeActive(true);
    //         setLike(like+1)
    //     }

    // }