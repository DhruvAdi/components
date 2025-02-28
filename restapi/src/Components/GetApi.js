import { useState } from "react";
import axios from "axios";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to Fetch Data on Button Click
  const fetchData = () => {
    setLoading(true); // Show loading message
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Hide loading message
      });
  };

  return (
    <div className="container mt-4">
      <h1>Fetch Data</h1>
      <button className="btn btn-secondary" onClick={fetchData}>
        Fetch
      </button>

      {loading && <div className="alert alert-warning mt-3">⏳ Loading...</div>}

      {data.length > 0 && (
        <ul className="list-group mt-3">
          {data.map((item) => (
            <li key={item.id} className="list-group-item">
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchData;
