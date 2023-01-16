import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Mainscreen from './components/main-screen';
import reportWebVitals from './reportWebVitals';
import MyContextProvider from './my-context-provider'
import MyChildComponent from './my-child-component'
import UserId from './user-id';
import UserIdProvider from './userid-provider'
import Union from './union';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserIdProvider>
      <Union/>
    </UserIdProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
