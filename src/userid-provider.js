import React from 'react';
import UserId from './user-id'

 
export default function UserIdProvider(props) {
  const [globalVariable, setGlobalVariable] = React.useState(0);

  return (
    <UserId.Provider value={{ globalVariable, setGlobalVariable }}>
      {props.children}
    </UserId.Provider>
  );
}


