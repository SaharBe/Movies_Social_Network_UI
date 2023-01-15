import React, {useState} from 'react'
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';



export default function SearchBar() {

  const countries = [
    {name: "be", continent: "Eu"},
    {name: "in", continent: "as"},
    {name: "g", continent: "af"},

  ]

  const[searchInput, setSearchInput] = useState("");
  const searchBar = () => {}

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // if(sear)

  return (
    <MDBInputGroup>
      <MDBInput label='Search' />
      <MDBBtn rippleColor='dark'>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
  );
}

