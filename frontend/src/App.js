import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Booking from "./pages/payment/Booking";
import Pay from "./pages/payment/Pay";
import Summary from "./pages/payment/Summary";
import Hotel from "./pages/Hotel";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/pay" element={<Pay/>}/>
        <Route path="/summary" element={<Summary/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;

