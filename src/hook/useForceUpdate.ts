import React, { useState ,useCallback,useMemo} from "react";
export function useForceUpdate(){
    const [count, setCount] = useState(0);
    return useMemo(()=>({update:()=>setCount(count+1)}),[count])
}