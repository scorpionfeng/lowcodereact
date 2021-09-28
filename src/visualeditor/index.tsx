/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo ,useRef} from 'react';
import { VisualEditorValue,VisualConfig, createVisualBlock } from './util';
import './index.scss';
import VisualEditorBlock from './block';
import { useCallbackRef } from '../hook/useCallbackRef';
import { VisualEditorComponent } from './util';

export  const  VisualEditor:React.FC<{
  value:VisualEditorValue,
  onChange:(val:VisualEditorValue)=>void,
  config:VisualConfig
}>=(props)=>{
  console.log(props);


  const containerRef=useRef({} as HTMLDivElement)

  const containerStyles=useMemo(()=>{
    return {
      height: `${props.value.container.height}px`,
      width: `${props.value.container.width}px`,
    }
  },[props.value.container.height,props.value.container.width])

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
      <div className="visual-editor-container" style={containerStyles} ref={containerRef}>
        {props.value.blocks.map((block,index)=>(<VisualEditorBlock key={index} block={block} config={props.config}/>))}
      </div>
    </div>
    <div className="visual-editor-operator">operator</div>
  </div>
  )
};
