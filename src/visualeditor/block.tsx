import React,{useEffect, useMemo,useRef} from "react";
import { VisualBlock, VisualConfig } from './util';
import { useForceUpdate } from '../hook/useForceUpdate';
export interface IProp{
  key:number;
  block:VisualBlock,
  config:VisualConfig
}
export default function VisualEditorBlock(props:IProp){

  const elRef=useRef({} as HTMLDivElement)
  const {update}=useForceUpdate()
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
  
  
  useEffect(() => {
    if(props.block.adjustPosition){
      const {top,left} =props.block
      const {height,width} =elRef.current.getBoundingClientRect()
      props.block.adjustPosition=false
      props.block.top=top-height/2
      props.block.left=left-width/2
      update()
    }
  }, []);

  return <div className="visual-editor-block" style={styles} ref={elRef}>
    {render}
  </div>
}