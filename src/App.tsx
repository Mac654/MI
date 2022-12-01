import { Route, Routes } from 'react-router-dom';
import './App.css';
import Quotes from './components/Quotes';
import RandomQuote from './components/RandomQuote';

function App() {
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
