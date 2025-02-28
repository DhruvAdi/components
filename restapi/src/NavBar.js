import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Form from './Components/PostApi';
import FetchData from './Components/GetApi';
import DeleteData from './Components/Delete';
import UpdateData from './Components/PutApi';
import PatchData from './Components/PatchApi';
import Storage from "./Components/LocalSession";

const NavBar = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            APP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Post API
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/get" className="nav-link">
                  Get API
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/delete" className="nav-link">
                  Delete API
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/put" className="nav-link">
                  Put API
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/patch" className="nav-link">
                  Patch API
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/storage" className="nav-link">
                  Storage
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/get" element={<FetchData />} />
          <Route path="/delete" element={<DeleteData />} />
          <Route path="/put" element={<UpdateData />} />
          <Route path="/patch" element={<PatchData />} />
          <Route path="/storage" element={<Storage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavBar;
