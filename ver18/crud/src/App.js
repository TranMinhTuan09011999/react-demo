import './App.css';
import Navbar from  './components/Navbar';
import Home from './components/Home';
import AllUsers from './components/AllUsers';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/all" element={<AllUsers />} exact />
          <Route path="/add" element={<AddUser />} exact />
          <Route path="/edit/:id" element={<EditUser />} exact />
          <Route component={NotFound} />
        </Routes>
      </Router>
  );
}

export default App;