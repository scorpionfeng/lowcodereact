import React, {useRef, useState} from 'react';
import { useCallbackRef } from './hook/useCallbackRef';

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {

  const [pos,
    setPos] = useState({left: 0, top: 0});

    //立即 执行函数
    
  const moveDraggier = (() => {

    //拖拽开始时的数据
   const dragData= useRef({
      startTop:0,
      startLeft:0,
      startX:0,
      startY:0,
    })

    

    const mousedown = useCallbackRef((e:React.MouseEvent<HTMLDivElement>) => {
      console.log('mousedown execute');
      
      document.addEventListener('mousemove',mousemove)
      document.addEventListener('mouseup',mouseup)
      dragData.current={
        startTop:pos.top,
        startLeft:pos.left,
        startX:e.clientX,
        startY:e.clientY,
      }
    });

    const mousemove = useCallbackRef((e:MouseEvent) => {
      
      const {startX,startY,startLeft,startTop} = dragData.current
      const durX=e.clientX-startX;
      const durY=e.clientY-startY;
      //打印发现输出的值一直是旧值,不是新值

      console.log(JSON.stringify(pos));

      setPos({
        top:startTop+durY,
        left:startLeft+durX
      })
    })

    const mouseup = useCallbackRef((e:MouseEvent) => {
      document.removeEventListener('mousemove',mousemove);
      document.removeEventListener('mouseup',mouseup);
    })
    return {mousedown}

  })();

  return (
    <div>
      <h1>Drag and drop</h1>
      <div
        style={{
        height: '50px',
        width: '50px',
        background: 'black',
        position: 'relative',
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        display: 'inline-block'
      }}
      onMouseDown={moveDraggier.mousedown}
      
      />
      <h1>ending</h1>
    </div>
  );
}
