import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Updated import

const EditContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated const history=useHistory();
  const { id } = useParams();

  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );
    const checkNumber = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.number === parseInt(number)
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
      id: parseInt(id),
      name,
      email,
      number,
    };

    dispatch({ type: 'UPDATE_CONTACT', payload: data });
    toast.success('Student updated successfully');

    // Use the navigate function to navigate to a different route
    navigate('/'); // Replace '/' with the desired route
  };
  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
          <div className="col-md-6 shadow mx-auto p-3 my-3">
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
              <div className="form-group my-3 m-center">
                <input
                  type="submit"
                  value="Update Student"
                  className="btn btn-success"
                />

                <Link to="/" className="btn mx-6 btn-danger">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">
          Studentcontact with id {id}not exists
        </h1>
      )}
    </div>
  );
};

export default EditContact;
