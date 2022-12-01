import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteAuthor } from "../Interfaces/QuoteInterface";

interface Props {}

const RandomQuote: React.FC<Props> = (props) => {
    const navigate = useNavigate()
    const [randomQuote, setRandomQuote] = useState<QuoteAuthor[]>([])
    const [toggleRandomQuote, setToggleRandomQuote] = useState(false)

    useEffect(() => {
        fetch("https://zenquotes.io/api/random")
        .then(res=>res.json())
        .then(data=>setRandomQuote(data))
    }, [toggleRandomQuote])

    return (
        <div className="RandomQuote" style={{height:'100vh',display:"flex",justifyContent:'center',alignItems:'center'}}>
            <div>
                {randomQuote.map((el,idx)=>{
                    return  <article key={`randomQuoteArticle-${idx}`}>
                                <blockquote>{el.q}</blockquote>
                                -- {el.a}
                            </article>
                })}
                <div style={{marginTop:"3rem"}}>
                <Button variant="contained" style={{marginRight:'3rem'}} onClick={()=>navigate(-1)}>
                    Go Back to Quotes Page
                </Button>
                <Button variant="contained" onClick={()=>setToggleRandomQuote(!toggleRandomQuote)}>
                    Get a random Quote
                </Button>
                </div>
            </div>
        </div>
    );
};

export default RandomQuote;