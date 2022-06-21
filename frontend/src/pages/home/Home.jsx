import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header";
import "../style.css";
import SearchBar from "../../components/searchBar/SearchBar";
import DatePicker from "../../components/datePicker/DatePicker";
import OptionsPicker from "../../components/optionsPicker/OptionsPicker";
import { Link } from "react-router-dom"

function Home() {
  // return (
  //   <div>
  //     <Navbar/> 
  //     <Header placeholder="Enter Country..." data={BookData}/>
  //   </div>
  // );


  return (
    <div>
      <Navbar/>
      <div className="searchBar-container">
        <div className="searchBar-box">
          <h1>Find your dream destination.</h1>
          <SearchBar className="searchBar"/>
          <DatePicker className="searchBar"/>
          <OptionsPicker className="searchBar"/>
        </div>
        <Link to="/hotels" color="white"> To Hotels</Link>
      </div>
    </div>
  )
}

export default Home;