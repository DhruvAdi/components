import React, { useState, useEffect } from "react";

const Storage = () => {
  const [localValue, setLocalValue] = useState("");
  const [sessionValue, setSessionValue] = useState("");

  // Load stored values on component mount
  useEffect(() => {
    setLocalValue(localStorage.getItem("localData") || "");
    setSessionValue(sessionStorage.getItem("sessionData") || "");
  }, []);

  // Save to Local Storage
  const saveToLocalStorage = () => {
    localStorage.setItem("localData", localValue);
    alert("Saved to Local Storage!");
  };

  // Save to Session Storage
  const saveToSessionStorage = () => {
    sessionStorage.setItem("sessionData", sessionValue);
    alert("Saved to Session Storage!");
  };

  // Clear Storage
  const clearStorage = () => {
    localStorage.removeItem("localData");
    sessionStorage.removeItem("sessionData");
    setLocalValue("");
    setSessionValue("");
    alert("Cleared Storage!");
  };

  return (
    <div className="container mt-4">
      <h2>🔹 Local & Session Storage Example</h2>

      {/* Local Storage Input */}
      <div className="mb-3">
        <label className="form-label">Local Storage Value:</label>
        <input
          type="text"
          className="form-control"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={saveToLocalStorage}>
          Save to Local Storage
        </button>
      </div>

      {/* Session Storage Input */}
      <div className="mb-3">
        <label className="form-label">Session Storage Value:</label>
        <input
          type="text"
          className="form-control"
          value={sessionValue}
          onChange={(e) => setSessionValue(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={saveToSessionStorage}>
          Save to Session Storage
        </button>
      </div>

      {/* Clear Storage */}
      <button className="btn btn-danger" onClick={clearStorage}>
        Clear Storage
      </button>
    </div>
  );
};

export default Storage;
