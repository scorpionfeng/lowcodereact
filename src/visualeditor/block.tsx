import React,{useMemo} from "react";
import { VisualBlock, VisualConfig } from './util';
export interface IProp{
  key:number;
  block:VisualBlock,
  config:VisualConfig
}
export default function VisualEditorBlock(props:IProp){

  const styles=useMemo(()=>{
    return {
      top:`${props.block.top}px`,
      left:`${props.block.left}px`,
    }
  },[props.block.top,props.block.left])

  const component=props.config.componentMap[props.block.componentKey]
  let render:any;
  if(component){
    render=component.render()
  }

  return <div className="visual-editor-block" style={styles}>
    {render}
  </div>
}