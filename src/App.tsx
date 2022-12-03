import { useEffect } from 'react';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Quotes from './pages/Quotes';
import RandomQuote from './pages/RandomQuote';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/quotes')
  }, [])
  
  return (
    <div className="App">
      <Routes>
        <Route path={'/quotes'} element={<Quotes/>} />
        <Route path={'/random-quote'} element={<RandomQuote/>}/>
      </Routes>
    </div>
  );
}

export default App;
