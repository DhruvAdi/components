import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
                setCredentials({ username: "dhruva", password: "12345" });
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        }
        fetchUserData();
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                sessionStorage.setItem("isAuthenticated", "true");
                setIsAuthenticated(true);
                navigate("/Dashboard");
            }
            else {
                setMessage("Invalid credentials")
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Login failed! Please try again.")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" 
                    disabled={loading}>{loading?"Logging in":"Login"}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
