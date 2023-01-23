import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import './temp.css'



function MovieList(props){

    let boolArray = props.movies.map(m => m.user_like ? true : false);

    let intArray =  props.movies.map(m => m.number_of_likes);

   const cache = React.useRef(
    new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight:700
    })
   );

    function SendLikeChange(movieID, userID, index){
        //console.log(index)

            if(boolArray[index] === true){
                
                boolArray[index]= false;
                intArray[index] = intArray[index] - 1;
                
            }else{
                boolArray[index]= true;
                intArray[index] = intArray[index] + 1;
            }
      
        API.sendLikeChange(movieID, userID);
    }

   

    return(<div>{console.log(props.movies)}<div>{props.movies.length}</div><div></div>  <div>{intArray.toString()}</div> <div>{boolArray.toString()}</div>
            <div>{props.movies.length === 0 ? <div><h1>Loading...</h1></div> : <div>ITS full</div>}</div>
    <div style={{width: "100%", height: "100vh"}}>
        <AutoSizer>
            {({width, height}) =>  <List 
                width={width} 
                height={height} 
                rowHeight={600} 
                deferredMeasurementCache={cache.current}
                rowCount={props.movies.length} 
                rowRenderer={ ({key, index, style, parent}) => {
                    const m = props.movies[index];

                    return (
                        <CellMeasurer  key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                            <div style={style}>
                                <Table className='card'>
                                    <thead>
                                        <tr>
                                        <th>
                                            <h1>{m.title}</h1>
                                            <h2>
                                             {intArray[index]}
                                                
                                                <FontAwesomeIcon icon={faHeart} onClick={() => SendLikeChange(m.movieId, props.userID,index)} className={boolArray[index] === true ? 'red' : 'other'}/>
                                            </h2>
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><h3>Production Company:</h3></td>
                                            <td><div>{m.production_company === "[]" ?  <p>UNKNOWN</p> : <p>{m.production_company}</p>}</div></td>
                                            </tr>
                                        <tr>
                                            <td><h3>Genre:</h3></td>
                                            <td><div>{m.genres !== null ?m.genres.map( genre => { return (<div>{genre === null ? <p>UNKNOWN</p> : <p>{genre}</p>}</div>) }) :  <p>UNKNOWN</p> }</div></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Original language:</h3></td>
                                            <td><div>{m.language}</div></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Budget:</h3></td>
                                            <td><div>{m.budget === 0 ?  <p>UNKNOWN</p> : <p>{m.budget}$</p>}</div></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Revenue:</h3></td>
                                            <td><div>{m.revenue === 0.0 ?  <p>UNKNOWN</p> : <p>{m.revenue}$</p>}</div></td>
                                        </tr>
                                        <tr>
                                            <td><h3>Runtime</h3></td>
                                            <td> <div>{m.runtime === null ? <p>UNKNOWN</p> : <p>{m.runtime} minutes</p>}</div></td>
                                        </tr>
                                        <tr>
                                            <td>
                                             <h3>Movie ID:</h3>   
                                            </td>
                                            <td>
                                            <p>{m.movieId}</p>
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
          

}

export default MovieList
