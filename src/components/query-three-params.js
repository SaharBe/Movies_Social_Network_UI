import React, { useState } from 'react';
import '../App.css'
import MovieList from './movie-list';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
export default function QueryThreeParams(props){

    const XOptions = ["runtime", "revenue", "budget"]
    const Yoptions = ["smallest", "biggest"]
    const Zoptions = ["Production company" , "language"];

    const [xQuery, setXQuery] = useState('');
    const [yQuery, setYQuery] = useState('');
    const [zQuery, setZQuery] = useState('');

    const [xOption, setXOption] = useState('');
    const [yOption, setYOption] = useState('');
    const [zOption, setZOption] = useState('');


    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');


    const handleSelectX=(e)=>{

        switch(e){
            case XOptions[0]:  setXQuery("runtime") ;
            break;
            case XOptions[1]: setXQuery("revenue");
            break;
            case XOptions[2]: setXQuery("budget");
            break;
            default: setXQuery('');

        }
        setXOption(e)
    }

    const handleSelectY=(e)=>{

        switch(e){
            case Yoptions[0]:  setYQuery("Asc") ;
            break;
            case Yoptions[1]: setYQuery("Desc");
            break;
            default: setYQuery('');

        }
        setYOption(e)
    }

    const handleSelectZ=(e)=>{

        switch(e){
            case Zoptions[0]:  setZQuery("production_company") ;
            break;
            case Zoptions[1]: setZQuery("language");
            break;
            default: setZQuery('');

        }
        setZOption(e)
    }

    const handleClick = async () => {
        setIsLoading(true);

        try{
            

            const response = await fetch(`http://localhost:8080/movies/query-three-input?user_id=${props.userID}&input_one=${xQuery}&input_two=${yQuery}&input_three=${zQuery}`, {
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


        }catch(erro){
            setErr(erro.message);
            return err;
        }finally {
            setIsLoading(false);
            return isLoading;
        }
    };

    return(
        <div className='App'>
            <Form>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <h3 style={{color: "white"}}>Show all films by </h3> 
                            </td>
                            <td>
                                <DropdownButton 
                                    className='row'
                                    type='text'
                                    title={"Options: " +zOption}
                                    variant="success"
                                    onSelect={handleSelectZ}
                                    >
                                    {Zoptions.map(mfa => {
                                        return(
                                        <Dropdown.Item eventKey={mfa}>{mfa}</Dropdown.Item>)
                                    })}
                                </DropdownButton>
                            </td>
                            <td>
                                <h3 style={{color: "white"}}>whose average</h3>
                            </td>
                            <td>
                                <DropdownButton 
                                className='row'
                                    type='text'
                                    title={"Options: " +xOption}
                                    variant="success"
                                    onSelect={handleSelectX}
                                    >
                                    {XOptions.map(mfb => {
                                        return(
                                        <Dropdown.Item eventKey={mfb}>{mfb}</Dropdown.Item>)
                                    })}
                                </DropdownButton>
                            </td>
                            <td>
                                <h3 style={{color: "white"}}>of films is the</h3>
                            </td>
                            <td>
                                <DropdownButton 
                                    className='row'
                                    type='text'
                                    title={"Options: " +yOption}
                                    variant="success"
                                    onSelect={handleSelectY}
                                    >
                                    {Yoptions.map(mfc => {
                                        return(
                                        <Dropdown.Item eventKey={mfc}>{mfc}</Dropdown.Item>)
                                    })}
                                </DropdownButton>
                            </td>
                        </tr>
                     </tbody>
                </Table>

                
              <Button  variant="success" onClick={handleClick} >Choose feature</Button>{' '}
            </Form>

            <div>
                {xQuery === '' || yQuery === '' || zQuery === '' ? <div><h3>Waiting for a filter option to be selected...</h3></div> :  <MovieList userID={props.userID} movies={movies} /> }
            </div>
        </div>
    )  





}