import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PreLoginWelcomePage from './pages/PreLoginWelcomePage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreLoginWelcomePage onStartLogin={() => { console.log('start login') }} />} />
      </Routes>
    </Router>
  )
}

export default App
