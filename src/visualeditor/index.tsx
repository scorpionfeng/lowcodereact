/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo ,useRef} from 'react';
import { VisualEditorValue,VisualConfig, createVisualBlock } from './util';
import './index.scss';
import VisualEditorBlock from './block';
import { useCallbackRef } from '../hook/useCallbackRef';
import { VisualEditorComponent ,VisualBlock} from './util';

export  const  VisualEditor:React.FC<{
  value:VisualEditorValue,
  onChange:(val:VisualEditorValue)=>void,
  config:VisualConfig,
}>=(props)=>{
  console.log(props);


  const containerRef=useRef({} as   HTMLDivElement)


  const containerStyles=useMemo(()=>{
    return {
      height: `${props.value.container.height}px`,
      width: `${props.value.container.width}px`,
    }
  },[props.value.container.height,props.value.container.width])


  const focusData=useMemo(()=>{

    const focus:VisualBlock[]=[]
    const unFocus:VisualBlock[]=[]
    props.value.blocks.forEach(block => {(block.focus?focus:unFocus).push(block)})
    return {
      focus,unFocus
    }
  },[props.value.blocks])

  const methods={
    updateBlocks:(blocks:VisualBlock[])=>{
      props.onChange({
        ...props.value,
        blocks:[...blocks]
      })
    },
    clearFocus:(eternal?:VisualBlock)=>{
        (!!eternal?focusData.focus.filter(item=>item!==eternal!):focusData.focus).forEach(
          block=>{block.focus=false}
        )
        methods.updateBlocks(props.value.blocks)
    }
  }

  const menuDragger=(()=>{

    const dragData=useRef({
      dragComponent:null as null | VisualEditorComponent,
    })

    const block={
      // eslint-disable-next-line react-hooks/rules-of-hooks
      dragstart:useCallbackRef((e:React.DragEvent<HTMLDivElement>,component:VisualEditorComponent)=>{

        containerRef.current.addEventListener('dragenter',container.dragenter);
        containerRef.current.addEventListener('dragover',container.dragover);
        containerRef.current.addEventListener('dragleave',container.dragleave);
        containerRef.current.addEventListener('drop',container.drop);

        dragData.current.dragComponent=component

      }),
      dragend:useCallbackRef((e:React.DragEvent<HTMLDivElement>)=>{
        containerRef.current.removeEventListener('dragenter',container.dragenter);
        containerRef.current.removeEventListener('dragover',container.dragover);
        containerRef.current.removeEventListener('dragleave',container.dragleave);
        containerRef.current.removeEventListener('drop',container.drop);
      })
    }

    const  container={
      dragenter:useCallbackRef((e:DragEvent)=>{
        e.dataTransfer!.dropEffect='move'
      }),
      dragover:useCallbackRef((e:DragEvent)=>{e.preventDefault()}),
      dragleave:useCallbackRef((e:DragEvent)=>{e.dataTransfer!.dropEffect='none'}),
      drop:useCallbackRef((e:DragEvent)=>{
        console.log('新增加');
        props.onChange({
          ...props.value,
          blocks:[
            ...props.value.blocks,
            createVisualBlock({
              top:e.offsetY,
              left:e.offsetX,
              component:dragData.current.dragComponent!
            })
          ]
        })
        
      }),
    }
    return block
  })();

  const  focusHander=(()=>{
    const mousedownBlock=(e:React.MouseEvent<HTMLDivElement>,block:VisualBlock)=>{
      console.log('点击了block');
      if(e.shiftKey){
        if(focusData.focus.length<=1){
          block.focus=true
        }else{
          block.focus=!block.focus
        }
        methods.updateBlocks(props.value.blocks)

      }else{
        if(!block.focus){
          block.focus=true;
          methods.clearFocus(block)
        }

      }
      
    }
    const mousedownContainer=(e:React.MouseEvent<HTMLDivElement>)=>{
      if(e.target!=e.currentTarget){
        return 
      }
      if(!e.shiftKey){
        methods.clearFocus()
      }
      console.log('点击了 container');
      
    }

    return {
      block:mousedownBlock,
      container:mousedownContainer
    }

  })();
  
  return(
  <div  className='visual-editor'>
    <div className="visual-editor-menu">
      {
        props.config.componentArray.map((component,index,arr)=><div
        key={index}
        draggable
        onDragStart={e=>menuDragger.dragstart(e,component)}
        onDragEnd={menuDragger.dragend}
         className='visual-editor-menu-item'>
        {component.preview()}
        <div className="visual-editor-menu-item-name">
          {component.name}
        </div>
      </div>)
      }
    </div>
    <div className="visual-editor-head">head</div>
    <div className="visual-editor-body">
      <div className="visual-editor-container" style={containerStyles} ref={containerRef} onMouseDown={focusHander.container}>
        {props.value.blocks.map((block,index)=>(<VisualEditorBlock key={index} block={block} config={props.config} onMousedown={e=>focusHander.block(e,block)}/>))}
      </div>
    </div>
    <div className="visual-editor-operator">operator</div>
  </div>
  )
};
