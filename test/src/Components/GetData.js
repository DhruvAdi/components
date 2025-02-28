import axios from "axios"
import { useEffect, useState } from "react"


const GetData = () =>{

const [data,setData] = useState([]);

    useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all")
        .then((response)=> setData(response.data))
        .catch((error) => console.error("error in fetching",error))
    })


    return (
        <div>
            <h1>get data</h1>
            <ul>

            {data.map((item,index) => (
                <li key={index}>{item.name.common} - {item.capital}</li>
            ))}
            </ul>
        </div>
    )
}

export default GetData;