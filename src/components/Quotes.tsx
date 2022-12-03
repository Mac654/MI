import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuoteAuthor } from "../Interfaces/QuoteInterface";
import Aos from "aos";
import "aos/dist/aos.css";

interface Props {}

const Quotes: React.FC<Props> = (props) => {
  const [quoteList, setQuoteList] = useState<QuoteAuthor[]>([]);
  const [fetchingDataTime, setFetchingDataTime] = useState(false)

  async function fetchData() {
    setFetchingDataTime(true)
    const quoteArray = await (await fetch('https://zenquotes.io/api/quotes')).json()
    const userPromise = Promise.all(
      quoteArray.map(
        async (i: QuoteAuthor) =>
          await (
            await fetch(`https://api.genderize.io/?name=${i.a.split(" ")[0]}`)
          ).json()
      )
    );
    const userArray = await userPromise;
    setQuoteList(quoteArray.map((el:QuoteAuthor,idx:number)=>{
      return {...el, gender: userArray[idx].gender}
    }))
    setFetchingDataTime(false)
  }

  useEffect(() => {
    fetchData();
    Aos.init({ duration: 2000 });
  }, []);

  return fetchingDataTime ? <div style={{display:'flex',justifyContent:'center',alignItems:'center' ,height:'100vh', flexDirection:'column',color:'yellow'}}>
    <h1>Winter is coming, prepare yourself...</h1>
    <CircularProgress color="warning" />
  </div> : (
    <div className="Quotes">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 ,backgroundColor:'black' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="whiteColor fontBold">ID</TableCell>
              <TableCell align="left" className="whiteColor fontBold">Quote</TableCell>
              <TableCell align="left" className="whiteColor fontBold">Author</TableCell>
              <TableCell align="left" className="whiteColor fontBold">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quoteList.map((row: QuoteAuthor, idx:number) => (
              <TableRow
                data-aos="fade-right"
                key={`eachRowKey-${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="whiteColor">
                  {/* I wasnt sure if the task wanted me to set em up from 1 to 50 in order or just use the c property from object that would represent the ID,so i went with C*/}
                  {`${row.c}`}
                </TableCell>
                <TableCell align="left" className="whiteColor">{`${row.q}`}</TableCell>
                <TableCell align="left" className="whiteColor">{`${row.a}`}</TableCell>
                <TableCell align="left" className="whiteColor" >
                  {row.gender === 'male' ? '👨' : row.gender === 'female' ? '👩' : '🤖'}
                </TableCell>
              </TableRow>
           ))} 
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" style={{ margin: "3rem 0" }}>
        <Link
          to={"/random-quote"}
          style={{ color: "whitesmoke", textDecoration: "none" }}
        >
          Get a random Quote and go to page 2
        </Link>
      </Button>
    </div>
  );
};

export default Quotes;
