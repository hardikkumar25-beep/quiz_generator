import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import QuizLoader from "./components/QuizLoader.jsx";
import QuizGenerator from './components/QuizGenerator.jsx';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <header>
          <h1 >Interactive Quiz Generator</h1>
        </header>
        <main>
          <Routes>
            <Route path="/quiz/:id" element={<QuizLoader />} />
            <Route path="/" element={<QuizGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
