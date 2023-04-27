import React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

// Create context object for passing the signed in user
export const CurrentUserContext = createContext();
// Create context object for setting the signed in user
export const SetCurrentUserContext = createContext();

// Custom hook for signedinuser context
export const useCurrentUser = () => useContext(CurrentUserContext);
// Custom hook for setsignedinuser context
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // Current user and set the current user state
  const [currentUser, setCurrentUser] = useState(null)
  const [errors, setErrors] = useState({});
  const history = useHistory()

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      setErrors(errors.response?.data)
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    // request interceptor, this will try and refresh the token before making a request
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (error) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // response interceptor to refresh auth token
    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}