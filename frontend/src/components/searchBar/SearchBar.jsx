import React from 'react'
import "./searchbar.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import logo from "./logo.png";

function SearchBar() {
    const countries = [
        {
            id: 0,
            name: "Singapore",
        },
        {
            id: 1,
            name: "Thailand",
        },
        {
            id: 2,
            name: "Japan",
        },
        {
            id: 3,
            name: "Korea",
        },
        {
            id: 4,
            name: "Australia",
        },
    ];

    const handleOnSearch = (string, results) => {
        console.log(string, results);
      };
    
      const handleOnHover = (result) => {
        console.log(result);
      };
    
      const handleOnSelect = (item) => {
        console.log(item);
      };
    
      const handleOnFocus = () => {
        console.log("Focused");
      };
    
      const handleOnClear = () => {
        console.log("Cleared");
      };

  return (
    <div className='SearchBar'>
        <header className='SearchBar-header'>
            <div style={{width: 200, margin: 20}}>
                <img
                src = {logo}
                alt='logo'
                style={{width: "100%", marginBottom: 20}}
            />
            <ReactSearchAutocomplete
                items={countries}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                styling={{ zIndex: 4 }}
                autoFocus
            />
    </div>
    </header>
    </div>
  );
}
        
export default SearchBar