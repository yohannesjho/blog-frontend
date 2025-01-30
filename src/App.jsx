import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Category from "./pages/Category"
import Article from "./pages/Article"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./AuthContext"
import { ToastContainer } from "react-toastify";



function App() {
  return (
    <AuthProvider>
      <Router>
      <ToastContainer />
        <Layout className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/article" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App
