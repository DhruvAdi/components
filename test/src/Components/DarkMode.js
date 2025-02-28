import { useEffect, useState } from "react"

const DarkMode = () =>{

    const [darkMode, setDarkMode] = useState(() =>{
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() =>{
        document.body.className = darkMode ?"bg-dark text-light":"bg-light text-dark";
        localStorage.setItem("darkMode",darkMode)
    },[darkMode]);


    return (
        <div>
            <h2>{darkMode?"🌙Dark Mode":"☀️ Light Mode"}</h2>
            <button className={`btn ${darkMode?"btn-light":"btm-dark"}`} onClick={()=>setDarkMode(!darkMode)}>Toggle{darkMode?"dark":"light"} Mode</button>
        </div>
    )
}
export default DarkMode;