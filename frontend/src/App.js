import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import ContactFormWithSocialButtons from "./pages/payment/Booking";
import Pay from "./pages/payment/Pay";
import Summary from "./pages/payment/Summary";
import Hotel from "./pages/Hotel";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/payment/Success";

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
})

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/booking" element={<ContactFormWithSocialButtons/>}/>
        <Route path="/pay" element={<Pay/>}/>
        <Route path="/summary" element={<Summary/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
