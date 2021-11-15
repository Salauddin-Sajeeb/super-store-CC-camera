import { createContext } from "react";
import UseFirebase from "../Pages/Hooks/UseFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContext = UseFirebase();
    return (
        <div>
            <AuthContext.Provider value={allContext}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;