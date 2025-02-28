import { useState } from "react"


const Count = () =>{ 
    const [count,setCount] = useState(0);
    return(
        <>
        <h1>Count:{count}</h1>
        <button onClick={() => setCount(count+1)} >➕increment</button>

        <button onClick={() => count >0 && setCount(count-1)} >➖decrement</button>
        <button onClick={() => setCount(0)}>🔄️reset</button>
        </>
    )
}

export default Count;