import { DateRange } from "react-date-range";
import "./header.css";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import logo from "./logo.png";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";


function Header2(placeholder, data) {

// start of the search bar

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.country.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } 
    else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  // start of the autocomplete

  const handleOption = (name, operation) =>{
    setOptions((prev)=>{
    return {
      ...prev,
      [name]: operation === "i"? options[name] + 1: options[name] - 1,
      };
    });
  };

  // start of the date picker

  const [openDate, setOpenDate] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // start of the third component

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });



  return (
    <div className="search">
        <div className=''>
            <div style={{width:200, margin: 20}}>
                <img
                src= {logo}
                alt= 'logo'
                style= {{width: "100%", marginBottom:20}}
                />

            <input
                type='text'
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
            />

            <div className="searchIcon">
                {filteredData.length === 0 ? (
                    <SearchIcon />
                ) : (
                    <CloseIcon id= 'clearBtn' onClick={clearInput}/>
                )}
            </div>
        </div>
        {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                    return (
                    <a className="dataItem" href={value.link} target="_blank">
                    <p>{value.country} </p>
                    </a>
                    );
                })}
            </div>
            )}

            <div className="headerTime">
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerTimeText"
                  >{`${format(state[0].startDate, "MM/dd/yyyy")} 
                  to ${format(
                  state[0].endDate,
                  "MM/dd/yyyy")}`}
                </span>

                  {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  className="date"
                  />}
            </div>

            <div className="headerPeopleItem">
                <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText">
                    {`${options.adult} adult · ${options.children} 
                    children · ${options.room} room`}
                </span>

                {openOptions && (
                <div className="options">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                        <button 
                        disabled={options.adult<= 1}
                        className="optionCounterButton" 
                        onClick={()=>handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button 
                        className="optionCounterButton" 
                        onClick={()=>handleOption("adult", "i")}>+</button>
                    </div>
                  </div>

                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                        <button 
                        disabled={options.children<= 0}
                        className="optionCounterButton" 
                        onClick={()=>handleOption("children", "d")}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" 
                        onClick={()=>handleOption("children", "i")}>+</button>
                    </div>
                  </div>

                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                        <button 
                        disabled={options.room<= 1}
                        className="optionCounterButton" 
                        onClick={()=>handleOption("room", "d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" 
                        onClick={()=>handleOption("room", "i")}>+</button>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
            </div>
    )
}

export default Header2