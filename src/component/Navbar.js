import React,{useEffect} from 'react'
import { NavLink,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
  const navigate = useNavigate();
  let location=useLocation()
  useEffect(() => {
    // console.log(location.pathname)
  }, [location])
  const handlelogout=()=>[
    localStorage.removeItem('token'),
    navigate('/login')
    

  ]

  




  return (
    <div>
     <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">ronny notebook </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">about</NavLink>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form  className="d-flex">
        <NavLink className="btn btn-primary mx-2"  to="/login"  role="button" >Login</NavLink>
        <NavLink className="btn btn-primary mx-2 "  to="/signup" role="button" >Sign up</NavLink>
        </form>: <button  onClick={handlelogout} className='btn btn-primary' >Logout</button>}
    </div>
  </div>
</nav>

{/* <h1>react router dom</h1>
<NavLink to={"/"}>Home</NavLink>
<NavLink to={"/about"}></NavLink> */}

  
    </div>
  )
}
export default Navbar
