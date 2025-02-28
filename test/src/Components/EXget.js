import axios from "axios";
import React, { useState } from "react";


const Exget = () =>{

    const [data,setData] = useState([]);
    

    useState(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(responsse => setData(responsse.data))
        .catch(error => console.log(error));
    },[]);



    return(
        <>
        <ul>
            {data.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
        </>
    )
}

export default Exget;