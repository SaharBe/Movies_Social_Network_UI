import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../App.css'
import Table from 'react-bootstrap/Table'
import { API } from '../rest-api-service';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import './temp.css'



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

   

    return(<div>{console.log(props.movies)}<div>{props.movies.length}</div>
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
                                        <th><h1>{m.title}</h1><h2>{m.number_of_likes === null? 0 : m.number_of_likes}<FontAwesomeIcon icon={faHeart} onClick={() => sendLikeChange(m.movieId, props.userID)} className={m.user_like === true ? 'red' : 'other'}/></h2></th>
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
