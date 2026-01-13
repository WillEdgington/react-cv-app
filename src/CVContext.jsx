import { createContext, useReducer, useContext, useEffect } from "react";

const CVContext = createContext();

const STORAGE_KEY = "cv_data"

const initialState = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  skills: [],
  education: [],
  experience: [],
}

function loadInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  return {
    ...state,
    [action.section]: action.payload,
  };
}

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state]);

  const updateSection = (section, payload) => {
    dispatch({ section, payload });
  };

  return (
    <CVContext.Provider value={{ state, updateSection }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}