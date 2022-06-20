import "./navbar.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import Register from "../../pages/proxy/Register"
import Login from "../../pages/proxy/Login"

export default function Navbar() {
  const navigate = useNavigate()

  const registerRoute = () => {
    navigate("/register")
  }
  const loginRoute = () => {
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Ascenda Hotel Booking</span>
        <div className="navItems">
          <button className="navButton" onClick={registerRoute}>Register</button>
          <button className="navButton" onClick={loginRoute}>Login</button>

          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/Login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
  
}