import {Route, Routes} from "react-router"
import Home from "./pages/Home"
import FAQ from "./pages/FAQ"
import Results from "./pages/Results"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App