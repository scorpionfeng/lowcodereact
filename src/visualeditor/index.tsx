import React from 'react';
import { VisualEditorValue,VisualConfig } from './util';
import './index.scss';

export  const  VisualEditor:React.FC<{
  value:VisualEditorValue,
  onChange:(val:VisualEditorValue)=>void,
  config:VisualConfig
}>=(props)=>{
  console.log(props);
  
  return(
  <div  className='visual-editor'>
    <div className="visual-editor-menu">
      {
        props.config.componentArray.map((component,index,arr)=><div className='visual-editor-menu-item'>
        {component.preview()}
        <div className="visual-editor-menu-item-name">
          {component.name}
        </div>
      </div>)
      }
    </div>
    <div className="visual-editor-head">head</div>
    <div className="visual-editor-body">body</div>
    <div className="visual-editor-operator">operator</div>
  </div>
  )
};
