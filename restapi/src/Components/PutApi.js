import axios from "axios";
import { useEffect, useState } from "react";

const UpdateData = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); // Track which item is being edited
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedBody, setUpdatedBody] = useState("");

  // Fetch Data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => setData(response.data))
      .catch((error) => console.log("❌ Error in fetching", error));
  }, []);

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditId(item.id);
    setUpdatedTitle(item.title);
    setUpdatedBody(item.body);
  };

  // Handle Update (PUT Request)
  const handleUpdate = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: updatedTitle,
        body: updatedBody,
      })
      .then((response) => {
        setData(data.map((item) => (item.id === id ? response.data : item)));
        setEditId(null); // Exit edit mode
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="container mt-4">
      <h1>Update API (PUT)</h1>
      <ul className="list-group mt-3">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            {editId === item.id ? (
              // Edit Mode
              <div>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="form-control mb-2"
                />
                <textarea
                  value={updatedBody}
                  onChange={(e) => setUpdatedBody(e.target.value)}
                  className="form-control mb-2"
                />
                <button className="btn btn-success" onClick={() => handleUpdate(item.id)}>
                  Save
                </button>
                <button className="btn btn-secondary ms-2" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // View Mode
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <button className="btn btn-primary" onClick={() => handleEdit(item)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateData;
