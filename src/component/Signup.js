
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: "",name:"",cpassword:""}) 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email,password }=credentials
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email,password })
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          props.showAlert("account created sucessfully","sucesss")
          navigate("/")
          console.log(props.showAlert)
      } 
      else{
        console.log(props.showAlert)
        props.showAlert("invalid credentials","danger")
      }

     
      
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
      <div>
          <form  onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="email" name="name" aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5}  required />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="cpassword" className="form-control" value={credentials.password} onChange={onChange} name="cpassword" id="password" minLength={5}  required />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
  )
}

export default Signup