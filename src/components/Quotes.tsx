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
  const [genderArray, setGenderArray] = useState<QuoteAuthor[]>([]);
  const [fetchingDataTime, setFetchingDataTime] = useState(false)

  async function fetchData() {
    setFetchingDataTime(true)
    const ids = await (await fetch('https://zenquotes.io/api/quotes')).json()
    const data = Promise.all(
      ids.map(
        async (i: QuoteAuthor, idx:number) =>
          await (
            await fetch(`https://jsonplaceholder.typicode.com/posts/${idx+1}`)
          ).json()
      )
    );
    const data2 = await data;
    setGenderArray(data2);
    setQuoteList(ids)
    setFetchingDataTime(false)
  }
  useEffect(() => {
    fetchData();
  }, []);
  
    // async function fetchData() fetches the info and sets the states on line 32 and 33
    // However settings the states, can also be done in the useEffect hook below
    // and once thats done we trigger the useEffect hook on line 54
    // and add the title property to the quoteList state array elements
    // For the last step i had to use the hint of "divide and conquer" just like Daenerys Targaryen did Rawr!

  // useEffect(() => {
  //   fetchData().then((data:any) => {
  //     data[1].then((d:any) => {
  //       setGenderArray(d);
  //     });
     
  //     setQuoteList(data[0]);
  //     });
  //   }, []);

    useEffect(() => {
      setQuoteList(quoteList.map((el,idx)=>{
        return {...el, title: genderArray[idx].title}
      }))
    }, [genderArray]);  

  return fetchingDataTime ? <div>fetching...</div> : (
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
            {quoteList.map((row: QuoteAuthor, idx:number) => (
              <TableRow
                key={`eachRowKey-${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* I wasnt sure if the task wanted me to set em up from 1 to 50 in order or just use the c property from object that would represent the ID,so i went with C*/}
                  {`${row.c}`}
                </TableCell>
                <TableCell align="left">{`${row.q}`}</TableCell>
                <TableCell align="left">{`${row.a}`}</TableCell>
                <TableCell align="left">
                  {row.title}
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
