import "./optionsPicker.css";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';



function DatePicker({placeholder, data}) {

  // start of third component

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // for the autocomplete
  const handleOption = (name, operation) =>{
    setOptions((prev)=>{
    return {
      ...prev,
      [name]: operation === "i"? options[name] + 1: options[name] - 1,
    };
  });
};

  return (
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
  )
}

export default DatePicker