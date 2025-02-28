import { useState } from "react"


const FormTest = () =>{

    const [formData, setFormdata] = useState({
        name:"",
        email:""
    });
    const [message,setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handelChange = (e) =>{
        setFormdata({...formData,[e.target.name] : e.target.value});
    }

    const validate = () =>{
        let tempErrors = {};

        if(formData.name.trim().length < 3){
            tempErrors.name = "Enter the valid name"
        }
        let pattren = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!pattren.test(formData.email.trim())){
            tempErrors.email = "Enter a valid email";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }


    const handelSubmit = async (e) =>{
        e.preventDefault();
        // console.log(formData);
        

        if(!validate()){
            return
        }
        setLoading(true);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),

            });
            const data = await response.json();
            if(response.ok){
                setMessage("succesfully submited");
                setFormdata({name:"",email:""});
                setErrors({});
            }

            
        } catch (error) {
            setMessage("error in fetching APi");
            
        }
        setLoading(false);
    }





    return(

        <div className="container mt-4">
            <h1>form test</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className={`form-control ${errors.name?"is-invalid":""}`} 
                    value={formData.name} onChange={handelChange} required/>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" name="email" className={`form-control ${errors.email?"is-invalid":""}`}  value={formData.email} onChange={handelChange} required/>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <button className="btn btn-primary" disabled={loading}>{loading?"submitting":"submit"}</button>
            </form>

        </div>
    )
}

export default FormTest