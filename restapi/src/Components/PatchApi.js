import axios from "axios";
import { useEffect, useState } from "react";

const PatchData = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); // Track which item is being edited
  const [updatedTitle, setUpdatedTitle] = useState(""); // Store updated title

  // Fetch Data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => setData(response.data))
      .catch((error) => console.log("❌ Error in fetching", error));
  }, []);

  // Handle title click (Enter edit mode)
  const handleEdit = (item) => {
    setEditId(item.id);
    setUpdatedTitle(item.title);
  };

  // Handle update on blur (when user clicks away)
  const handleBlur = (id) => {
    if (updatedTitle.trim() === "") {
      setEditId(null); // Exit edit mode if empty
      return;
    }

    axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: updatedTitle, // Updating only the title
      })
      .then((response) => {
        setData(data.map((item) => (item.id === id ? { ...item, title: response.data.title } : item)));
        setEditId(null); // Exit edit mode
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="container mt-4">
      <h1>PATCH API (Inline Edit)</h1>
      <ul className="list-group mt-3">
        {data.map((item) => (
          <li key={item.id} className="list-group-item">
            {editId === item.id ? (
              // Inline Input for Editing
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                onBlur={() => handleBlur(item.id)} // Update on blur
                autoFocus
                className="form-control"
              />
            ) : (
              // Display Title (Click to Edit)
              <strong onClick={() => handleEdit(item)} style={{ cursor: "pointer" }}>
                {item.title}
              </strong>
            )}
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatchData;
