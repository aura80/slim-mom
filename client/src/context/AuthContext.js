import { createContext, useState } from "react"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(!!localStorage.getItem("token"));

    const login = (userData, token) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};