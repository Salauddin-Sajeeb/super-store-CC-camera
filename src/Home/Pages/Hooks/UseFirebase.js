import { useState, useEffect } from "react";

import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, getIdToken, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, updateProfile } from "firebase/auth";
import initializeFirebase from "../Login/Firebase/firebase.init";
initializeFirebase()

const UseFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({})
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState('')
    const googleprovider = new GoogleAuthProvider();

    const RegisterUser = (email, password, name, history) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser)

                saveUser(email, name, "POST")


                // update Name
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(error.message)
                // ..
            });


    }


    const Loginuser = (email, password, location, history) => {

        signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {

                // Signed in 
                const user = userCredential.user;
                const destination = location?.state?.from || '/';
                history.push(destination)
                // ...

            })
            .catch((error) => {
                setAuthError(error.message)
            });

    }

    const logOut = () => {

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    const SignInGoogle = () => {
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                saveUser(user.email, user.displayName, "PUT")
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                    .then(idToken => setToken(idToken))

            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unsubscribe;
    }, [])

    useEffect(() => {
        fetch(`https://immense-beyond-10275.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const saveUser = (email, displayName, method) => {

        fetch('https://immense-beyond-10275.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, displayName })
        })
            .then()
    }



    return {
        Loginuser, RegisterUser, user, logOut, isLoading, SignInGoogle, authError, admin, token
    }


};

export default UseFirebase;