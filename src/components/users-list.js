import React from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';
import './temp.css'

export default function UserList(props){

    return (
        <div>

        <div>
          { props.users && props.users.map( user =>{
            return (<div key={user.userId}  >
                        <dv>
                            <Table Table className='card'>
                                <thead>
                                    <tr>
                                        <h2>{user.userName}</h2>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <h3>{user.userLikes}</h3></td>
                                        <td><h3>movies liked</h3></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </dv>
                    </div>)

          })}
        </div>
        </div>)



}