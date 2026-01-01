import {Route, Routes} from "react-router"
import Home from "./pages/Home"
import FAQ from "./pages/FAQ"
import Results from "./pages/Results"
import { ResultsProvider } from "./context/ResultsContext"

const App = () => {
  return (
    <ResultsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </ResultsProvider>
  )
}

export default App