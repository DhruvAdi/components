import React, { useEffect, useRef, useState } from "react";



const SearchFilter = () => {
    const nameList = ["tom", "john", "robot", "kane"];

    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);
    const [selected, setSelected] = useState([]);
    const [hoveritem, setHover] = useState(null);

    const filterNames = nameList.filter((name) => name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handelCilckOutside = (event) => {

            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("click", handelCilckOutside);

    }, []);
    const handelselect = (name) => {
        if (!selected.includes(name)) {
            setSelected([...selected, name])
        }
        setSearch("");
        setShowDropdown(false);
    }


    const handelremove = (name) =>{
        setSelected(selected.filter((item)=> item !== name));
    }



    return (
        <>
            <div style={{display:"flex"}}>
                <div ref={inputRef} style={{marginRight:"50px"}}>
                    <h2>Search Names</h2>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} onClick={() => setShowDropdown(true)} />
                    {showDropdown && filterNames.length > 0 && (<ul>
                        {filterNames.map((item, index) => (
                            <li key={index} onClick={() => handelselect(item)} style={{cursor:"pointer"}}>{item}</li>
                        ))}
                    </ul>)}
                </div>
                <div>
                    <h3>selected</h3>
                    {}
                    {selected.map((item, index) => (
                        <div key={index} onMouseEnter={()=> setHover(item)} onMouseLeave={()=> setHover(null)}>{item}
                        {hoveritem === item && ( <span onClick={()=>handelremove(item)} style={{cursor:"pointer"}}>❌</span>)}
                        
                       </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default SearchFilter;
