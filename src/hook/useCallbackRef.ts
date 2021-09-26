import { useCallback, useRef } from "react";


//需要得到一个不变的函数 引用,获取最新的值
export function useCallbackRef<FN extends ((...args:any[])=>any)>(fn:FN):FN{
    const fnRef=useRef(fn);
    fnRef.current=fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(((...args:any[])=>{fnRef.current(...args)}) as FN,[]);
}

