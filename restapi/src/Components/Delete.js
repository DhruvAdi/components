import axios from "axios";
import { useEffect, useState } from "react";

const DeleteData = () => {
  const [data, setData] = useState([]);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => setData(response.data))
      .catch((error) => console.log("❌ Error in fetching:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("❌ Error deleting post:", error));
  };

  return (
    <div className="container mt-4">
      <h1>Delete API</h1>
      <ul className="list-group mt-3">
        {data.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onMouseEnter={() => setHover(item.id)}
            onMouseLeave={() => setHover(null)}
          >
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
            <button
              className={`btn btn-danger ${hover === item.id ? "" : "invisible"}`}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteData;
