import { createContext, useReducer, useContext, useEffect } from "react";

const CVContext = createContext();

const STORAGE_KEY = "cv_data"

const initialState = {
  personal: {
    name: "William Edgington",
    email: "willedge037@gmail.com",
    phone: "07777777777",
    location: "London, England",
    summary: "Aspiring software developer skilled in JavaScript, React, Python, and Java, with an interest in writing clear, reliable code and developing maintainable systems. Motivated by learning, problem-solving, and applying technical skills to real-world software projects.",
    linkedin: "",
    github: "WillEdgington",
  },
  skills: [
    { id: 0, name: "Python" }, 
    { id: 1, name: "PyTorch" }, 
    { id: 2, name: "Ruby" },
    { id: 3, name: "Rails" },
    { id: 4, name: "JavaScript"},
    { id: 5, name: "React"},
    { id: 6, name: "Java"},
    { id: 7, name: "JavaFX"},
    { id: 8, name: "SQL"}
  ],
  education: [
    {
      id: 0,
      school: "University of Essex",
      qualification: "Mathematics and Economics",
      startYear: "2022",
      endYear: "2024",
      description: ""
    },
    {
      id: 1,
      school: "University of Helsinki, MOOC.FI",
      qualification: "Java Programming I & Java Programming II",
      startYear: "2025",
      endYear: "2025",
      description: ""
    }
  ],
  experience: [
    {
      id: 0,
      company: "Big Made Up Company",
      role: "Big Time Software Developer",
      location: "Big City",
      startYear: "2025",
      endYear: "",
      isCurrent: true,
      description: "front-end\nback-end\ncompilers\nmachine learning"
    },
    {
      id: 1,
      company: "Small Made Up Company",
      role: "Software Developer",
      location: "Small City",
      startYear: "2020",
      endYear: "2022",
      isCurrent: false,
      description: "coffee"
    }
  ],
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