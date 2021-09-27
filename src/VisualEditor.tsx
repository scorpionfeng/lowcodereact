import React from 'react';
import './VisualEditor.scss';

export const  VisualEditor:React.FC<{}>=()=>{
  return(
  <div  className='visual-editor'>
    <div className="visual-editor-menu">menu</div>
    <div className="visual-editor-head">head</div>
    <div className="visual-editor-body">body</div>
    <div className="visual-editor-operator">operator</div>
  </div>
  )
};
