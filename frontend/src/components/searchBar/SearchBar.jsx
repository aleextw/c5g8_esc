import "./searchbar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Navbar from "../../components/navbar/Navbar"
// import BookData from "./Data.json";
import BookData from "../../pages/home/destinations.json";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function SearchBar() {
  // return (
  //   <div>
  //     <Navbar/> 
  //     <Header placeholder="Enter Country..." data={BookData}/>
  //   </div>
  // );

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }


  return (
    <div className="searchBar">
      <ReactSearchAutocomplete
        items={BookData}
        fuseOptions={{ keys: ["term"] }}
        resultStringKeyName="term"
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
      ></ReactSearchAutocomplete>
    </div>
  )
}

export default SearchBar;