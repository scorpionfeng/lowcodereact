import React,{useEffect, useMemo,useRef} from "react";
import { VisualBlock, VisualConfig } from './util';
import { useForceUpdate } from '../hook/useForceUpdate';
import classNames from "classnames";
export interface IProp{
  key:number;
  block:VisualBlock,
  config:VisualConfig;
  onMousedown?:(e:React.MouseEvent<HTMLDivElement>)=>void
}
export default function VisualEditorBlock(props:IProp){

  const elRef=useRef({} as HTMLDivElement)
  const {update}=useForceUpdate()
  const styles=useMemo(()=>{
    return {
      top:`${props.block.top}px`,
      left:`${props.block.left}px`,
      opacity: props.block.adjustPosition?'0':''
    }
  },[props.block.top,props.block.left,props.block.adjustPosition])


  const classes=useMemo(()=>classNames(['visual-editor-block',{'visual-editor-block-focus':props.block.focus}]),[props.block.focus])
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

  return <div className={classes} style={styles} ref={elRef} onMouseDown={props.onMousedown}>
    {render}
  </div>
}
