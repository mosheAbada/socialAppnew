import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // must import components for use
import SignIn from './pages/SignIn'; // must import components for use
import SignUp from './pages/SignUp'; // must import components for use
import Navbar from './components/Navbar'; // must import components for use
import AdminPage from './pages/AdminPage';
import { LanguageProvider } from './LanguageContext';


function App() {
  return (
    <div className="App">
      <LanguageProvider>
        {/* wrapper for navigating between pages */}
        <Router>
          {/* navbar will appear on all pages */}
          <Navbar />
          <Routes>
            {/* each page will gate a route and a unique path and element */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}
export default App;
