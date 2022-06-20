import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header";
import "./home.css";
import BookData from "./Data.json";

const Home = () => {
  return (
    <div>
      <Navbar/> 
      <Header placeholder="Enter Country..." data={BookData}/>
    </div>
  );
}

export default Home;