import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./signup.css"

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({email :credentials.email,password:credentials.password})
        };
        const response = await fetch(`/api/auth/loginuser`, requestOptions);
        const data = await response.json();
        console.log(data);
        if(data.success=== true){
            //save auqth token and redirect 
            localStorage.setItem("token",data.token)
            navigate('/')
            props.showAlert("Logged in successfully" , "success")
        }else {
            props.showAlert("Invalid credentials" , "danger")
        }
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container screen'>
            <h3 className='my-3 text-center'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name='password' />
                </div>
                <div className="text-center">
                <button type="submit" className="btn btn-primary my-3">
                Submit
                </button>

                </div>
                </form>
        </div>
    )
}

export default Login