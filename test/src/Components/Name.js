import { useState } from "react"


function Toggletext(){

    const [visible, setVisible]= useState(true);


    return (
        <>
        
        <button onClick={()=> setVisible(!visible)}>{visible?"hide":"show"}text</button>
        {visible && <p>this ttoogle text</p>}
        </>
    )
}

export default Toggletext;