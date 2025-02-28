import axios from "axios";
import { useEffect, useState } from "react";

 

 const FetchGet = () =>{

    const [data,setData] = useState([]);
    const [loading,setLOading] = useState(true);
    const [errors, setErrors] = useState("")

        useEffect(()=>{
            axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response =>{
                setData(response.data.slice(0,5));
                setLOading(false);
            })
            .catch(()=>{
                setErrors("failed to fetch data");
                setLOading(false)

            })

        })


    return (
        <>
        <h1>Fetch data</h1>
        {loading && <p>Loding</p>}
        {errors && <p style={{color:"red"}}>{errors}</p>}
        <ul>
            {data.map((user =>
                <div key={user.id}>{user.name}- {user.email}</div>
            ))}
        </ul>
        </>

    );
 }

 export default  FetchGet;