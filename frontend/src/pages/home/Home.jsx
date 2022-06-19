import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header";
import "./home.css";
import BookData from "./Data.json";
import SearchBar from "../../components/searchBar/SearchBar";

const Home = () => {
  return (
    <div>
      <Navbar/> 
      <Header placeholder="Enter Name..." data={BookData}/>
    </div>
  );
}

export default Home;