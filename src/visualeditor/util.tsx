

export interface VisualBlock{
  componentKey:string;
  top:number;
  left:number;
}

export interface VisualEditorValue{
  container:{
    height:number;
    width:number
  }
  blocks:VisualBlock[];
}

export interface VisualEditorComponent{
  key:string,
  name:string,
  preview:()=>JSX.Element,
  render:()=>JSX.Element,
}


export function createVisualConfig() {
  //用于block数据,通过key找到component对象,使用render属性渲染内容至container窗口里面
  const componentMap:{[k:string]:VisualEditorComponent}={}

  //用户在menu中渲染预定义的组件列表

  const componentArray:VisualEditorComponent[]=[]

  function registryComponent(key:string,option:Omit<VisualEditorComponent,'key'>){
    if(componentMap[key]){
      const index=componentArray.indexOf(componentMap[key])
      componentArray.splice(index,1)
    }
    const newComp={
      key,...option
    }
    componentArray.push(newComp)

    componentMap[key]=newComp

  }

  return {
    componentMap,componentArray,registryComponent
  }
  
}

export type VisualConfig=ReturnType<typeof createVisualConfig>