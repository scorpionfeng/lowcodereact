import React, { useMemo } from 'react';
import { VisualEditorValue,VisualConfig } from './util';
import './index.scss';
import VisualEditorBlock from './block';

export  const  VisualEditor:React.FC<{
  value:VisualEditorValue,
  onChange:(val:VisualEditorValue)=>void,
  config:VisualConfig
}>=(props)=>{
  console.log(props);

  const containerStyles=useMemo(()=>{
    return {
      height: `${props.value.container.height}px`,
      width: `${props.value.container.width}px`,
    }
  },[props.value.container.height,props.value.container.width])
  
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
    <div className="visual-editor-body">
      <div className="visual-editor-container" style={containerStyles}>
        {props.value.blocks.map((block,index)=>(<VisualEditorBlock key={index} block={block} config={props.config}/>))}
      </div>
    </div>
    <div className="visual-editor-operator">operator</div>
  </div>
  )
};
