import React from 'react';
import { useState } from "react";
import './App.css';
import { VisualEditor } from './visualeditor/index';
import { visualConfig } from './visualeditor/config';
import { VisualEditorValue } from './visualeditor/util';

function App() {

  const [editorValue, setEditorValue] = useState(()=>{
    return {
      container:{
        height:500,
        width:1000,
      },
      blocks:[
        {componentKey:'text',
      top:100,
    left:100,
    adjustPosition:false
  },
        {componentKey:'button',
      top:200,
    left:200,
    adjustPosition:false},
        {componentKey:'input',
      top:300,
    left:300,
    adjustPosition:false},
      ]
    } as VisualEditorValue
  });

  return (
    <div >
      <VisualEditor config={visualConfig} value={editorValue} onChange={setEditorValue}/>
    </div>
  );
}

export default App;
