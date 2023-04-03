import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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

    // Get the current user and then set signed in user state
    const handleMount = async () => {
        try {
            const { data } = await axios.get('dj-rest-auth/user/')
            setSignedInUser(data);
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    // wait until the component has mounted then run function
    useEffect(() => {
        handleMount();
    }, [])

    return (
        <SignedInUserContext.Provider value={signedInUser}>
            <SetSignedInUserContext.Provider value={setSignedInUser}>
                {children}
            </SetSignedInUserContext.Provider>
        </SignedInUserContext.Provider>
    )
}