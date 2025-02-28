import React, { useEffect, useRef, useState } from "react";


const Myform = () =>{
const [inputs,setINputs] = useState("");

const [textarea,setTextarea] = useState("hi");
const [cars,setcars] = useState("honda");

const handelInputs = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setINputs(values =>({...values,[name]:value}));
}

const handelChange = (event)=>{
setTextarea(event.target.value)
}

const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
}
const handelselect = (e)=>{
setcars(e.target.value)
}
const mystyle = {
    color:"blue",
    fontSize:"20px"

} 
const [color, setColor ]= useState("blue");

const [car, setCar ]= useState({
    carname:"ford",
    year:"2024",
    color:"blue"
});

const updatColor = (e) =>{
    setCar((prevcar)=>({...prevcar,color:e}))
}

const updateyear = (e) =>{
    setCar((prevcar)=>({...prevcar,year:e}))
}

const [count,setCount] = useState(0);
const [calculation, setCulation] =useState(0);

useEffect(()=>{
    setCulation(() => count * 2);
},[count])

const inputElement = useRef();
const focusInput = ()=>{
    inputElement.current.focus();
}
    return(
        <form onSubmit={handleSubmit}>
            <label className="App-link">Name</label>
            <input type="text" name="username" onChange={handelInputs}/>
            <label>age</label>
            <input type="text" name="age" onChange={handelInputs}/>
            <textarea value={textarea} onChange={handelChange}></textarea>
            <select value={cars} onChange={handelselect}>
                <option value="ford">ford</option>
                <option value="honda">honda</option>
                <option value="toyota">toyota</option>
            </select>
            <h1>{car.color}</h1>
            <h1>{car.year}</h1>
            <button onClick={()=> updatColor("orange")}>one</button>
            <button onClick={() => updateyear("2025")}>two</button>
            <input type="submit"/>
            <h1>count:{count}</h1>
            <button onClick={()=> setCount((c)=> c+1)}>two</button>
            <h1>calculation:{calculation}</h1>
            <input ref={inputElement}/>
            <button onClick={focusInput}>click</button>
        </form>
    )
}

export default Myform;