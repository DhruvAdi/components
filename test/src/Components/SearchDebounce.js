import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DebouncedSearch = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null); // Store API request controller

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]); // Clear results when input is empty
      return;
    }

    // Cancel the previous request if it exists
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new AbortController instance
    const controller = new AbortController();
    controllerRef.current = controller;

    const timer = setTimeout(() => {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users?q=${search}`, { signal: controller.signal })
        .then(response => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        });
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timer);
      controller.abort(); // Abort request on unmount or re-render
    };
  }, [search]);

  return (
    <div>
      <h2>Debounced Search with API Call</h2>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search..." 
      />
      {loading && <p>Loading...</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedSearch;
