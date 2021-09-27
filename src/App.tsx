import React from 'react';
import { useState } from "react";
import './App.css';
import { VisualEditor } from './visualeditor/index';
import { visualConfig } from './visualeditor/config';
import { VisualEditorValue } from './visualeditor/util';

function App() {

  const [editorValue, setEditorValue] = useState({
    container:{
      height:700,
      width:1000,
    },
    blocks:[]
  } as VisualEditorValue);

  return (
    <div >
      <VisualEditor config={visualConfig} value={editorValue} onChange={setEditorValue}/>
    </div>
  );
}

export default App;
