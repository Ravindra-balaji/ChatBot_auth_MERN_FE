// CONTEXT FILE: appContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState({ isAuthenticated: false });


  const [persona, setPersona] = useState("friendly");

  const getUserDetails = async () => {
    try {
      setAppLoading(true);
      const resp = await axiosInstance.get("/users");
      if (resp.data.isSuccess) {
        setUser({
          isAuthenticated: true,
          ...resp.data.data.user,
        });
      } else {
        ErrorToast("Error in user validation", resp.data.message);
      }
    } catch (err) {
      console.log("------------------ error otherwise");
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const valueObj = {
    appLoading,
    user,
    persona,
    setPersona,
  };

  return <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
