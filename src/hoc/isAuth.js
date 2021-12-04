import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';


const isAuth = (InnerComponent) => {
    const Component = (props) => {
        const user = useContext(AuthContext);

        return user
            ? <InnerComponent {...props} />
            : <Redirect to="/sign-in" />
    }

    return Component;
};

export default isAuth;
