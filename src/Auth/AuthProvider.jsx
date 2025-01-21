import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext('')

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ loader, setLoader ] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword( auth, email, password )
    }

    const loginUser = ( email, password ) => {
        setLoader(true)
        return signInWithEmailAndPassword( auth, email, password )
    }

    const googleSignin = () => {
        setLoader(true)
        return signInWithPopup( auth, googleProvider )
    }

    const logout = () =>{
        setLoader(true)
        return signOut( auth )
    }

    const profileUpdate = (name, photo) => {
        return updateProfile( auth.currentUser ,{
            displayName: name, 
            photoURL: photo
        })
    }

    useEffect(()=>{
        setLoader(true)
        const unsubscribe = onAuthStateChanged( auth, (currentUser) =>{
            // console.log(currentUser);
            setUser(currentUser)
            if(currentUser){
                const userInfo = { email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then( res => {
                    // console.log(res.data);
                    if(res.data.token){
                        localStorage.setItem( 'access-token', res.data.token)
                        setLoader(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoader(false)
            }
        })

        return () => unsubscribe()
    },[axiosPublic])

    const authInfo = {
        user,
        setUser,
        loader,
        setLoader,
        createUser,
        loginUser,
        logout,
        profileUpdate,
        googleSignin,
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