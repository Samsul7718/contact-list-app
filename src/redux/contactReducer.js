// const API_ROOT = 'https://jsonplaceholder.typicode.com/users';

const initialState = [
  // {
  //   id: 0,
  //   name: 'samsul alam',
  //   number: 123456,
  //   email: 'rbk@gmail.com',
  // },
  // {
  //   id: 1,
  //   name: 'jack poland',
  //   number: 3232356,
  //   email: 'skm@gmail.com',
  // },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISING':
      state = action.payload;
      return state;

    case 'ADD_CONTACT':
      state = [...state, action.payload];
      return state;

    case 'UPDATE_CONTACT':
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;

    case 'DELETE_CONTACT':
      const filterContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};
export default contactReducer;
