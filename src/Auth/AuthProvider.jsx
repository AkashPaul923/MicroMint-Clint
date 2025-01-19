import { createContext, useState } from "react";

export const AuthContext = createContext('')

const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ loader, setLoader ] = useState(true)

    

    const authInfo = {
        user,
        setUser,
        loader,
        setLoader,
    }

    return (
        <AuthContext.Provider value={ authInfo }>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;