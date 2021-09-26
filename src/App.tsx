import React, { useMemo } from 'react';
import { useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fullname=useMemo(()=>{
    return  `my name ${username} ${password}`
  },[username])

  return (
    <div className="App">
      <h1>hello,world</h1>
      <input type='text' value={username} onChange={e=>setUsername(e.target.value)} />
      <input type='text' value={password} onChange={e=>setPassword(e.target.value)}/>
      {JSON.stringify({username,password,fullname})}
    </div>
  );
}

export default App;
