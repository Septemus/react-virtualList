import React from "react"
export type item={
    id:string,
    content:string
}
type propType={
    items:item[],
    width?:number,
    height?:number,
    lineHeight?:number
}
type stateType={
    visibleItems:item[],
    startIndex:number,
    // invisibleItemsHeight:number
}
const container=React.createRef<HTMLDivElement>()
class List extends React.Component<propType,stateType,any> {
    constructor(props:propType) {
        super(props)
        this.state={
            visibleItems:[],
            startIndex:0,
            // invisibleItemsHeight:0
        }
    }
    render() {
        const {width,height=500,lineHeight=40,items}=this.props
        console.log('render')
        return (
            <div 
                style={{
                    width:width?`${width}px`:'100%',
                    height:`${height}px`,
                    overflowY:"scroll",
                    position:"relative"
                }} 
                ref={container}
                onScroll={this.updList}
            >
                <ul
                    style={{
                        position:"absolute",
                        top:`${this.state.startIndex*lineHeight}px`,
                        width:"80%",
                        height:`${items.length * lineHeight-this.state.startIndex*lineHeight}px`,
                    }}
                >
                    {this.state.visibleItems.map((item) => (
                        <li key={item.id} style={{
                            lineHeight:`${lineHeight}px`,
                            border:"solid 1px red"
                        }}>{item.content}</li>
                    ))}
                </ul>
                
            </div>
        );    
    }
    componentDidMount(): void {
        this.updList()
    }
    updList=():void=>{
        const {items,lineHeight=40,height=500}=this.props
        const startIndex = Math.floor(container.current?.scrollTop as number/lineHeight)
        const endIndex=startIndex+Math.floor(height/lineHeight)
        // const invisibleItemsHeight = (startIndex + this.state.visibleItems.length - endIndex) * lineHeight;
        this.setState({
            visibleItems:items.slice(startIndex, endIndex),
            startIndex,
            // invisibleItemsHeight
        })
    }
    
}
export default List
