import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import QuizLoader from "./components/QuizLoader.jsx";

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
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
