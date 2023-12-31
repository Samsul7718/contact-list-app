import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Home = () => {
  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const deleteContact = (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
    toast.success('contact deleted successfully');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-center">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center px-4">
              <tr className="py-3">
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">number</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.number}</td>
                  <td>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-primary btn-small"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteContact(contact.id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
