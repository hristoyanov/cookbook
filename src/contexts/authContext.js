import { createContext, useContext, useState, useEffect } from 'react';

import { auth } from '../firebase';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
                sessionStorage.setItem('user', JSON.stringify({
                    email: authUser.email,
                    displayName: authUser.displayName,
                    uid: authUser.uid
                }));
            } else {
                setUser(null);
                sessionStorage.removeItem('user');
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}