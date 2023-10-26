import React, { useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
// import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated const history=useHistory();
  const { id } = useParams();

  const fetchData = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await data.json();
    dispatch({ type: 'INITIALISING', payload: response });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" Component={() => <Home />} />
        <Route path="/add" Component={() => <AddContact />} />
        <Route path="/edit/:id" Component={() => <EditContact />} />
      </Routes>
    </div>
  );
}
export default App;
