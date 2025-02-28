import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const validate = () => {
        let tempErrors = {};

        if (formData.name.trim().length < 3) {
            tempErrors.name = "Enter a valid Name";
        }

        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(formData.email)) {
            tempErrors.email = "Enter a valid Email";
        }

        if (formData.password.length < 6) {
            tempErrors.password = "Enter a valid password";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const apiUrl = "https://jsonplaceholder.typicode.com/posts";
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                setMessage(`✅ Data submitted successfully! ID: ${response.data.id}`);
                setFormData({ name: "", email: "", password: "" });
                setErrors({});
            } else {
                setMessage("⚠️ Something went wrong");
            }
        } catch (error) {
            setMessage("❌ Error in connecting to the API");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Form</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Form;
