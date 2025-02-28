import React, { useState } from "react";

const NewForm = () =>{

    const [formData, setformdata] = useState({
        name:"",
        email:"",
        password:""

    });

    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error,setErrors] = useState({});

    const handelChange = (e)=>{
        setformdata({...formData , [e.target.name] : e.target.value});
    }

    const validate = () => {
        let tempErrors = {};

        if(formData.name.trim().length <3){
            tempErrors.name = "Name must be at least 3 characters.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            tempErrors.email ="enter a valid email"
        }

        if(formData.password.length < 6){
            tempErrors.password = "enter a valid password";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }


    const handelSubmit = async (e) =>{
        e.preventDefault();
        setMessage("");
        console.log("form submit ", formData);
        if(!validate()){
            return;
        }
        setLoading(true); // Show loading state


        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
               method:"POST",
               headers:{
                "Content-Type":"application/json"
               }, 
               body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.ok){
                setMessage(`succes data was sent ${data.id}`);
                setformdata({ name: "", email: "", password: ""});
            }else{
                setMessage("something went wrong");
            }
            
        } catch (error) {
            setMessage("error in connecting api")
        }
        setLoading(false);
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">React Form</h1>

      {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" 
                    className={`form-control ${error.name ? "is-invalid" : ""}`} 
                    name="name"
                    value={formData.name}
                    onChange={handelChange} required/>
                    {error.name && <div className="invalid-feedback">{error.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${error.email ? "is-invalid" : ""}`} name="email"
                    value={formData.email} onChange={handelChange} required/>
                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${error.password ? "is-invalid" : ""}`} name="password"
                    value={formData.password} onChange={handelChange} required/>
                    {error.password && <div className="invalid-feedback">{error.password}</div>}
                </div>
                <button className="btn btn-primary" disabled={loading}>{loading?"submitting...":"submit"}</button>
            </form>
        </div>

    )
} 

export default NewForm;