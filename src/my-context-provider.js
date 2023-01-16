import React, { useState, useEffect } from 'react';
import MyContext from './my-var'

 
export default function MyContextProvider(props) {
  const [globalVariable, setGlobalVariable] = React.useState("initial value");

  return (
    <MyContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {props.children}
    </MyContext.Provider>
  );
}


