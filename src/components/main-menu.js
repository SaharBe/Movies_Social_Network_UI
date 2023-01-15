import React from 'react';
import '../App.css';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import MovieList from './movie-list';
import MovieDetails from './movie-details';

export default function MainMenu(props) {

    function showMovies(){
        console.log(props.movies)
    }
    
    return (
        <Paper sx={{ width: 320, maxWidth: '50%' }}>
          <MenuList>
            <MenuItem onClick={showMovies} >
              <ListItemText>Movies</ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemText>Users</ListItemText>
            </MenuItem>

            <MenuItem> 
              <ListItemText>Geners</ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemText>Directors</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      );
  }