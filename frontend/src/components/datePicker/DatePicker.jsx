import { DateRange } from "react-date-range";
import "./datePicker.css";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";


function DatePicker({placeholder, data}) {

  // start of datepicker
  const [openDate, setOpenDate] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  return (
    <div className = "headerTime">
        <span 
        onClick={() => setOpenDate(!openDate) }
        className="headerTimeText"
        >{`${format(state[0].startDate, "dd/MM/yyyy")} 
        to ${format(
        state[0].endDate,
        "dd/MM/yyyy"
      )}`}
        </span>
        {openDate && <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className="date"
        />}
    </div>
  )
}

export default DatePicker