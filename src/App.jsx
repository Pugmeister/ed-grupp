import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import Project from './pages/Project/Project'
import Services from './pages/Services/Services'
import Service from './pages/Service/Service'
import About from './pages/About/About'
import News from './pages/News/News'
import Article from './pages/Article/Article'
import Career from './pages/Career/Career'
import Contacts from './pages/Contacts/Contacts'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<Article />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
