import { DateRange } from "react-date-range";
import "./header.css";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import logo from "./logo.png";

function Header() {
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
  const [openDate, setOpenDate] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

const handleOption = (name, operation) =>{
  setOptions((prev)=>{
  return {
    ...prev,
    [name]: operation === "i"? options[name] + 1: options[name] - 1,
  };
});
};
  return (
    <div className="headerSearch">
        <div className='headerSearchItem'>
          <div style={{width: 200, margin: 20}}>
            <img
            src = {logo}
            alt='logo'
            style={{width:"100%", marginBottom: 20}}
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
        <input 
         type='text' 
         placeholder="Enter location" 
         className="headerSearchInput"/>
          <button className="searchButton">Search</button> 
        </div>
        <div className = "headerSearchItem">
          <span 
          onClick={() => setOpenDate(!openDate) }
          className="headerSearchText"
        >{`${format(state[0].startDate, "MM/dd/yyyy")} to ${format(
          state[0].endDate,
          "MM/dd/yyyy"
        )}`}</span>
          {openDate && <DateRange
          editableDateInputs={true}
          onChange={item => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className="date"
          />}
        </div>
        <div className="headerSearchItem">
          <span 
          onClick={() => setOpenOptions(!openOptions)}
          className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
              <button 
              disabled={options.adult<= 1}
              className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
              <span className="optionCounterNumber">{options.adult}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
              <button 
              disabled={options.children<= 0}
              className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
              <span className="optionCounterNumber">{options.children}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button 
              disabled={options.room<= 1}
              className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
              </div>
            </div>
          </div>
          )}
        </div>
    </div>
    </div>
  )
}

export default Header