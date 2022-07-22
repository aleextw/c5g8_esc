import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FormList from "./FormList";
import { useLocation, useNavigate } from "react-router-dom";


export default function Summary(props) {
  console.log("roomName: ", localStorage.getItem("roomName"));
  console.log("hotelName: ", localStorage.getItem("hotelName"));
  console.log("checkInDate: ", localStorage.getItem("checkInDate"));
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [forms, setForm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/summary/${params.get("booking_uid")}`)
      .then(res => {
        return res.json();
      }) 
      .then(data => {
          console.log(data);
          setForm(data);
      })
  }, []);
  
  return (
    <div className='home'>
      {forms && <FormList forms={forms}/>}
    </div>
  );
}