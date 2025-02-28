import React, { useEffect, useState } from "react";

import axios from "axios"

const FetchData = () =>{


    const [data, setData] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error, setErrors] = useState("");

    useEffect(() =>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((Response)=>{
            setData(Response.data.slice(0,10));
            setLoading(false)
        })
        .catch((err)=>{
            setErrors(err.message);
            setLoading(false);
        });
    },[])
        if(loading) return <h3>loading</h3>;
        if(error) return <h3 style={{color:"red"}}>{error}</h3>

    return (
        <div className="container mt-4">
            <h2>Fetch data</h2>
            <ul className="list-group">
               {data.map((item)=>(
                 <li key={item.id} className="list-group-item">
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                 </li>
               ))}

            </ul>

        </div>
    )
}

export default FetchData;