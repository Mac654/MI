import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuoteAuthor } from "../Interfaces/QuoteInterface";


interface Props {}

const Quotes: React.FC<Props> = (props) => {
  const [quoteList, setQuoteList] = useState<QuoteAuthor[]>([]);
  const [newRowArr, setNewRowArr] = useState<any>([])
  const [myNum, setMyNum] = useState<any[]>([])
  
  useEffect(() => {
    fetch('https://zenquotes.io/api/quotes')
    .then(res=>res.json())
    .then(data=>setQuoteList(data))
  }, [])
  

  useEffect(() => {

    if(quoteList.length > 1){
      let myArr = quoteList.map((el,idx):any=>{
          const fullName = el.a;
          const firstName = fullName.split(' ')[0].toLowerCase()   
            fetch(`https://api.genderize.io/?name=${firstName}`)
             .then(res=>res.json())
             .then(data=>{
              myNum.push(data.gender)
             })
             return {...el,genre:myNum[idx]}
        })
        setNewRowArr(myArr)
      }
    }, [quoteList])
  
console.log(myNum);

  return (
    <div className="Quotes">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Quote</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRowArr.map((row:any,idx:any) => (
            <TableRow
              key={`eachRowKey-${idx}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {/* I wasnt sure if the task wanted me to set em up from 1 to 50 in order or just use the c property from object that would represent the ID,so i went with the c */}
                {`${row.c}`}     
              </TableCell>
              <TableCell align="left">{`${row.q}`}</TableCell>
              <TableCell align="left">{`${row.a}`}</TableCell>
              <TableCell align="left">{row.genre === "female" ? `👩` :`👨`}</TableCell>
            </TableRow>
             ))} 
          </TableBody>
        </Table>
      </TableContainer>


      <Button variant="contained" style={{margin:'3rem 0'}}>
        <Link to={"/random-quote"} style={{color:"whitesmoke",textDecoration:'none'}}>
            Get a random Quote and go to page 2
        </Link>
      </Button>
    </div>
  );
};

export default Quotes;
