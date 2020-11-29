import React, { useReducer } from 'react';

const initialState = {
  data: null,
};
export const store = React.createContext();
const { Provider } = store;

function StateProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_INGREDIENTS':
        return {
          ...state,
          ingredients: action.payload,
        };
      default:
        return initialState;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default StateProvider;
