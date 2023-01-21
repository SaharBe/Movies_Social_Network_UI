import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { FixedSizeList } from 'react-window';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import './temp.css'


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

   const cache = React.useRef(
    new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight:700
    })
   );

    function sendLikeChange(movieID, userID){
        API.sendLikeChange(movieID, userID);
    }

    const innerArray = props.movies.map(item => item);


    const Row = (style) => (
        <div  style={style}>
            { props.movies && props.movies !== null && props.movies.map( (movie) =>{
            return (<div  key={movie.movieId} >
                         <div> 
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
                                        <td><p>{movie.language === null ?  <p>UNKNOWN</p> : <p>{movie.language}$</p>}</p></td>
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
                        </div>
                         
                    </div>)
                
          })}

        </div>
    );


    const Tow = ({index, style}) => {
        <div style={style}>
                         <div> 
                            <Table className='card'>
                                <thead>
                            
                                    <th><h1 >{innerArray[index].title}</h1></th>
                                    <th><h2>{innerArray[index].number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(innerArray[index].movieId, props.userID)} className={innerArray[index].user_like === true ? 'red' : 'other'}/></h2></th>
                                
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h3>Production Company:</h3></td>
                                        <td><p>{innerArray[index].production_company === "[]" ?  <p>UNKNOWN</p> : <p>{innerArray[index].production_company}</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Genre:</h3></td>
                                        <td><p>{innerArray[index].genres !== null ? innerArray[index].genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Original language:</h3></td>
                                        <td><p>{innerArray[index].language}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Budget:</h3></td>
                                        <td><p>{innerArray[index].budget === 0 ?  <p>UNKNOWN</p> : <p>{innerArray[index].budget}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Revenue:</h3></td>
                                        <td><p>{innerArray[index].revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{innerArray[index].revenue}$</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h3>Runtime</h3></td>
                                        <td> <p>{innerArray[index].runtime === null ? <p>UNKNOWN</p> : <p>{innerArray[index].runtime} minutes</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <p><h3>Movie ID:</h3></p>    
                                        </td>
                                        <td>
                                        <p>{innerArray[index].movieId}</p>
                                        </td>
                                    </tr>
                                {/* <p>{props.userID}</p> */}
                                </tbody>
                            </Table>

                    </div>
         </div>
    }



   
  

    return(<div>{innerArray.length}<div>{props.movies.length}</div>

    <div style={{width: "100%", height: "100vh"}}>
        <AutoSizer>
            {({width, height}) =>  <List 
                width={width} 
                height={height} 
                rowHeight={600} 
                deferredMeasurementCache={cache.current}
                rowCount={innerArray.length} 
                rowRenderer={ ({key, index, style, parent}) => {
                    const m = innerArray[index];

                    return (
                        <CellMeasurer  key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                            <div style={style}>
                                <Table className='card'>
                                    <thead>
                                        <th><h1>{m.title}</h1><h2>{m.number_of_likes === null? "0" : m.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(m.movieId, props.userID)} className={m.user_like === true ? 'red' : 'other'}/></h2></th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><h3>Production Company:</h3></td>
                                            <td><p>{m.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{m.production_company}</p>}</p></td>
                                            </tr>
                                        <tr>
                                            <td><h3>Genre:</h3></td>
                                            <td><p>{m.genres !== null ?m.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Original language:</h3></td>
                                            <td><p>{m.language}</p></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Budget:</h3></td>
                                            <td><p>{m.budget === 0 ?  <p>UNKNOWN</p> : <p>{m.budget}$</p>}</p></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Revenue:</h3></td>
                                            <td><p>{m.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{m.revenue}$</p>}</p></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Runtime</h3></td>
                                            <td> <p>{m.runtime === null ? <p>UNKNOWN</p> : <p>{m.runtime} minutes</p>}</p></td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <p><h3>Movie ID:</h3></p>    
                                            </td>
                                            <td>
                                            <p>{innerArray[index].movieId}</p>
                                        </td>
                                    </tr>
                                    </tbody>

                                </Table>
                                
                                
                               
                               
                            </div>
                        </CellMeasurer>);
                }}
            />}
           
        </AutoSizer>
    </div>

      
     </div>)
      
      


    // return (
    //     <div>
    //         <div>
    //         {props.movies && props.movies !== null ? 
    //             <div>{props.movies.length}</div>
    //          :  <div>0</div>}
    //         </div>
           
    //     <div>
            
    //         <LeftSide>
               
    //         { props.movies && props.movies !== null && props.movies.map( (movie, i) =>{
    //         return (<div  key={movie.movieId} index={i}>
    //                      <div>{i%3 === 0? <div>
                            
    //                         <Table className='card'>
    //                             <thead>
                            
    //                                 <th><h1 >{movie.title}</h1></th>
    //                                 <th><h2>{movie.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(movie.movieId, props.userID)} className={movie.user_like === true ? 'red' : 'other'}/></h2></th>
                                
    //                             </thead>
    //                             <tbody>
    //                                 <tr>
    //                                     <td><h3>Production Company:</h3></td>
    //                                     <td><p>{movie.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{movie.production_company}</p>}</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td><h3>Genre:</h3></td>
    //                                     <td><p>{movie.genres !== null ? movie.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td><h3>Original language:</h3></td>
    //                                     <td><p>{movie.language}</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td><h3>Budget:</h3></td>
    //                                     <td><p>{movie.budget === 0 ?  <p>UNKNOWN</p> : <p>{movie.budget}$</p>}</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td><h3>Revenue:</h3></td>
    //                                     <td><p>{movie.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{movie.revenue}$</p>}</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td><h3>Runtime</h3></td>
    //                                     <td> <p>{movie.runtime === null ? <p>UNKNOWN</p> : <p>{movie.runtime} minutes</p>}</p></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>
    //                                     <p><h3>Movie ID:</h3></p>    
    //                                     </td>
    //                                     <td>
    //                                     <p>{movie.movieId}</p>
    //                                     </td>
    //                                 </tr>
    //                             <p>{props.userID}</p>
                                    
                                    
    //                             </tbody>
    //                         </Table>
    //                     </div> : <div></div>}</div>
                         
    //                 </div>)
                
    //       })}
       
    //     </LeftSide >

    //     </div>
    //     </div>)
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
