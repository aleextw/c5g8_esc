import "./sideNavBar.css";
// import BookData from "./Data.json";
import BookData from "../../pages/home/destinations.json";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function SideNavBar() {

  return (
    <div>
      <Navbar/>
      <div className="sideNavBar-container">
        <div className="sideNavBar-box">
          <h1>Find your dream destination.</h1>
          <SearchBar className="searchBar"/>
          <DatePicker className="searchBar"/>
          <OptionsPicker className="searchBar"/>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;