import axios from "axios";
import { useEffect, useState } from "react";

// const usersData = [
//     { id: 1, name: "Alice", email: "alice@example.com" },
//     { id: 2, name: "Bob", email: "bob@example.com" },
//     { id: 3, name: "Charlie", email: "charlie@example.com" },
//     { id: 4, name: "David", email: "david@example.com" },
//     { id: 5, name: "Emma", email: "emma@example.com" },
//     { id: 6, name: "Frank", email: "frank@example.com" },
//     { id: 7, name: "Grace", email: "grace@example.com" },
//     { id: 8, name: "Henry", email: "henry@example.com" },
//     { id: 9, name: "Isabel", email: "isabel@example.com" }
//   ];

const Pagination = () => {
    const [usersData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const UserPage = 3;



    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => setUserData(response.data))
            .catch((error) => console.error("failed", error))
    }, [])


    const indexOfLastPage = currentPage * UserPage;
    const indexOfFirstPage = indexOfLastPage - UserPage;
    const CurrentUsers = usersData.slice(indexOfFirstPage, indexOfLastPage);

    const totalPages = Math.ceil(usersData.length / UserPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }
    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", }}>
                <h1>Pagination</h1>
                <div>

                    <button onClick={previousPage}>⏮️</button>
                    <span>{currentPage} of {totalPages}</span>
                    <button onClick={nextPage}>⏭️</button>
                </div>
            </div>
            <ul>
                {CurrentUsers.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>

        </div>
    )
};

export default Pagination;