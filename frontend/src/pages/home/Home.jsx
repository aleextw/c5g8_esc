import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header";
import "../style.css";
// import BookData from "./Data.json";
import BookData from "./destinations.json";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


function Home() {
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
    <div>
      <Navbar/>
      <header className="title">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={BookData}
            fuseOptions={{ keys: ["term"] }}
            resultStringKeyName="term"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
        </div>
      </header>
    </div>
  )
}

export default Home;