import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

// Create context object for passing the signed in user
export const SignedInUserContext = createContext();
// Create context object for setting the signed in user
export const SetSignedInUserContext = createContext();

// Custom hook for signedinuser context
export const useSignedInUser = () => useContext(SignedInUserContext);
// Custom hook for setsignedinuser context
export const useSetSignedInUser = () =>  useContext(SetSignedInUserContext);

export const SignedInUserProvider = ({ children }) => {
    // Current user and set the current user state
    const [signedInUser, setSignedInUser] = useState(null)
    const history = useHistory()

    const handleMount = async () => {
        try {
          const { data } = await axiosRes.get("dj-rest-auth/user/");
          setSignedInUser(data);
        } catch (err) {
          console.log(err);
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
            } catch (err) {
                setSignedInUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                  history.push("/signin");
                }
                return null;
              });
              return config;
            }
            return config;
          },
          (err) => {
            return Promise.reject(err);
          }
        );
    
        // response interceptor to refresh auth token
        axiosRes.interceptors.response.use(
          (response) => response,
          async (err) => {
            if (err.response?.status === 401) {
              try {
                await axios.post("/dj-rest-auth/token/refresh/");
                console.log('401 error');
              } catch (err) {
                setSignedInUser((prevCurrentUser) => {
                  if (prevCurrentUser) {
                    history.push("/signin");
                  }
                  return null;
                });
              }
              return axios(err.config);
            }
            return Promise.reject(err);
          }
        );
      }, [history]);

    return (
        <SignedInUserContext.Provider value={signedInUser}>
            <SetSignedInUserContext.Provider value={setSignedInUser}>
                {children}
            </SetSignedInUserContext.Provider>
        </SignedInUserContext.Provider>
    )
}