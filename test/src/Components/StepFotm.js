import React, { useState } from "react";

const MultiStepForm = () => {
  // Step State
  const [step, setStep] = useState(1);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Errors State
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const validateSteps = () =>{

    let temperros = {}
        if(step === 1 && formData.name.trim().length < 3 ){
            temperros.name ="enter a valid name";
        }
        if(step === 2 ){
            let pattren =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!pattren.test(formData.email)){
                temperros.email = "enter a valid email";
            }
            if(formData.password.length < 6){
                temperros.password = "enter a valid password";
            }
            if(formData.password !== formData.confirmPassword){
                temperros.confirmPassword = "password do not match"
            }
        }
        setErrors(temperros);
        return Object.keys(temperros).length === 0;
    
  }

  const handleNext = () =>{
    if(validateSteps()){

        setStep(step+1);
    }
  }

  const handlePrevious = () =>{
    setStep(step-1);
  }

  const handelSubmit = (e) =>{
    e.preventDefault();

    if(!validateSteps()){
        return;
    }
    console.log("formsubmit",formData);
    
  }

  return (
    <div className="container mt-4">
      <h2>Multi-Step Form</h2>
      <form onSubmit={handelSubmit}>
        {step === 1 && (
            <div>
                 <h3>Step 1: Personal Details</h3>
                <label className="form-label">Name</label>
                <input className={`form-control ${errors.name?"is-invalid":""}`} name="name" value={formData.name} onChange={handleChange}/>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
       ) }

       {step===2 && (
         <div>
         <h3>Step 2: Account Details</h3>
         <label>Email:</label>
         <input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           className={`form-control ${errors.email ? "is-invalid" : ""}`}
         />
         {errors.email && <div className="invalid-feedback">{errors.email}</div>}

         <label>Password:</label>
         <input
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}
           className={`form-control ${errors.password ? "is-invalid" : ""}`}
         />
         {errors.password && <div className="invalid-feedback">{errors.password}</div>}

         <label>Confirm Password:</label>
         <input
           type="password"
           name="confirmPassword"
           value={formData.confirmPassword}
           onChange={handleChange}
           className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
         />
         {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
       </div>
       )}

       {step === 3 && (
        <div>
            <p><strong>Name:</strong>{formData.name}</p>
            <p><strong>Email:</strong>{formData.email}</p>
            <p><strong>password:</strong>********</p>
        </div>
       )}

       <div className="mt-3">
        {step > 1 && <button className="btn btn-secondary me-2" onClick={handlePrevious}>Previous</button> }
        {step < 3 && <button  className="btn btn-primary" onClick={handleNext}>Next</button> }
        {step === 3 && <button  className="btn btn-success">Submit</button> }

       </div>
      </form>
       
    </div>
  );
};

export default MultiStepForm;
