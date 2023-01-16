// Use the context in a child component
import React, { useState, useEffect } from 'react';
import MyContext from './my-var'
import MyContextProvider from './my-context-provider'

export default function MyChildComponent() {
    const { globalVariable, setGlobalVariable } = React.useContext(MyContext);
  
    return (
      <div>
        <p>Global variable value: {globalVariable}</p>
        <button onClick={() => setGlobalVariable("new value")}>
          Update Global Variable
        </button>
      </div>
    );
  }