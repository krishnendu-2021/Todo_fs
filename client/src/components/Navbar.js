import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
const Navbar = () => {
    let navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#e8fbe8"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Todo App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to='/signup' role="button">Sign Up</Link>
                        </form>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar