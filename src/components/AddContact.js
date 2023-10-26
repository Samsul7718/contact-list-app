import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Updated import

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );
    const checkNumber = contacts.find(
      (contact) => contact.number === parseInt(number)
    );
    if (!name || !email || !number) {
      return toast.warning('Please fill all fields!');
    }
    if (checkEmail) {
      return toast.error('This email already exists');
    }
    if (checkNumber) {
      return toast.error('This number already exists');
    }

    const data = {
      id: contacts.length + 1,
      name,
      email,
      number,
    };

    dispatch({ type: 'ADD_CONTACT', payload: data }); 
    toast.success('Student added successfully');

    // Use the navigate function to navigate to a different route
    navigate('/'); // Replace '/' with the desired route
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 my-5 text-center">Add Student</h1>
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="mobile number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group mt-4 my-5 text-center">
              <input
                type="submit"
                value="Add Student"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
