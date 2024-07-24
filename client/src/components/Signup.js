import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {password,cpassword} = credentials
    if(password !== cpassword){
      alert("confirm pass and cpass are same")
      return
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    };
    const response = await fetch(`/api/auth/createuser`, requestOptions);
    const data = await response.json();
    console.log(data);

    //save auqth token and redirect
    if(data.success===true){
    localStorage.setItem("token", data.token);
    navigate("/");
    props.showAlert("SignedUp Successfully", "success")
  }else{
    props.showAlert("Invalid Details","danger")
  }
  };
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // style={{border:"2px solid black", width:"33%", borderRadius:"8px" }}
  return (
    <div className="container screen" >
        <h3 className="text-center my-2">Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onchange}
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onchange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>

        </div>
      </form>
    </div>
  );
};

export default Signup;
