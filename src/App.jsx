import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Category from "./pages/Category"
import Article from "./pages/Article"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"



function App() {
  return (
    <Router>

      <Layout className="">
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/article" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
