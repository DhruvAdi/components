import axios from "axios";
import React, { useState } from "react";



const Form = () => {

    
const [formData, setFormdata] = useState({
    name:"",
    email:"",
    password:""
});
const [message,setMessage] = useState("");
const [loading,setLoading] = useState(false);
const [errors,setErrors] = useState({});

const handleChange = (e) =>{
    setFormdata({...formData, [e.target.name]: e.target.value});
}
const validate = () =>{
    let tempErrors ={};
    if(formData.name.trim().length < 3){
        tempErrors.name = "enter the correct name";
    }
    let pattren= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattren.test(formData.email)){
        tempErrors.email = "enter a valid email";
    }
    if(formData.password.length < 6){
        tempErrors.password = "enter a valid password"
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
}

const handleSubmit = async (e) =>{
    e.preventDefault();
   
    setMessage("");
    if(!validate()){
        setLoading(false);
        return
    }
      console.log("formsubmit",formData);
      setLoading(true);  

      const apiUrl = "https://jsonplaceholder.typicode.com/posts";
      const userToken = "Bearer your_jwt_token_here";

      const payload = {
        name:formData.name,
        email:formData.email,
        password:formData.password
      }

      try {

        const Response = await axios.post(apiUrl,payload,{
            headers: {
                "Content-type":"application/json",
                Authorization:userToken

            }

        })

        if(Response.status == 201){
            setMessage(`succesfully submitted ${Response.data.id}`);
            setFormdata({name:"",email:"",password:""});
        }else{
            setMessage("something went wronge")
        }
        
      } catch (error) {
        setMessage("error in connecting API")
        
      }

    
    setLoading(false);
}
    return (
        <div className="container mt-4">
            <h1 className="mb-4">REact form</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className={`form-control ${errors.name? "is-invalid":""}`} name="name" value={formData.name} onChange={handleChange} required/>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${errors.email? "is-invalid":""}`} name="email" value={formData.email} onChange={handleChange} required/>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password? "is-invalid":""}`} name="password" value={formData.password} onChange={handleChange} required/>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button className="btn btn-primary" disabled={loading}>{loading?"Submitting...":"submit"}</button>
            </form>
        </div>
    )
}

export default Form;