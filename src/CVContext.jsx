import { createContext, useReducer, useContext } from "react";

const CVContext = createContext();

const initialState = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
}

function reducer(state, action) {
  return {
    ...state,
    [action.section]: action.payload,
  };
}

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSection = (section, payload) =>
    dispatch({ section, payload });

  return (
    <CVContext.Provider value={{ state, updateSection }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}