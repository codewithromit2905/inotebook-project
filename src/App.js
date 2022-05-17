import Navbar from './component/Navbar'
import './App.css';
import Home from './component/Home';
import About from './About';
import {
  BrowserRouter as Router,
  Routes,
  Route,


} from "react-router-dom";
import NoteState from './context/Notestate';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <>
    <NoteState> 
    <Router>
      <Navbar/>
      <Alert  alert={alert} />
    <div className='container'>

      <Routes>
          <Route path="/about" element ={<About/>}> </Route>
          <Route path="/"    element={<Home showAlert={showAlert} />} > </Route>
          <Route path="/login"  element={<Login  showAlert={showAlert}/>}> </Route>
          <Route path="/signup"  element={<Signup  showAlert={showAlert}/>}> </Route>
        </Routes>
      

    </div>
    </Router>
    </NoteState> 
    </>
  );
}

export default App;
