import React from "react";

class Test extends React.Component{

    constructor(props){
        super(props);
        this.state = {color:"red"};
    }
changeCOlor = () =>{
    this.setState({color:"red"});
}
componentDidMount(){
    setTimeout(()=>{
        this.setState({color:"blue"});
    },3000)
}
getSnapshotBeforeUpdate(prevProps,prevState){
    document.getElementById("div1").innerHTML ="before the update " + prevState.color; 
}

componentDidUpdate(){
    document.getElementById("div2").innerHTML ="before the update " + this.state.color; 

}
// shouldComponentUpdate(){
//     return true;
// }
// static getDerivedStateFromProps(props,state){
//     return {color: props.favcolor};
// }
shot = (a,b) =>{
    alert(b.type)
}

missed= ()=>{
    return <h1>missed</h1>
}
madegoal = () =>{
    return <h1>goal</h1>
}
goal = () =>{
  
    let isgoal =true;
    if(!isgoal){
        return this.missed()
    }
    return this.madegoal()
}
 cars = [
    {id:1,name:"ford"},
    {id:2,name:"honda"}
];
   

 
    render(){
        return(
            <div>
                <h1>my car color is {this.state.color}</h1>
                <div id="div1"></div>
                <div id="div2"></div>
                <div>{this.goal()}</div>
                <div>{this.cars.map((e)=> <p key={e.id}>{e.name}</p>)   }</div>
                <button onClick={this.changeCOlor}>change</button><br></br>
                <button onClick={(event) =>this.shot("goal",event)}>shot</button>
            </div>
        )

    }
}

export default Test;