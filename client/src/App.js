import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import PlayPage from './pages/Play'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/play/:aiName' element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
