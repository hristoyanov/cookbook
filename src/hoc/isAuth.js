import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';


const isAuth = (InnerComponent) => {
    const Component = (props) => {
        const user = useContext(AuthContext);
        const history = useHistory();

        if (!user) {
            history.push('/sign-in');

            return null;
        }

        return <InnerComponent {...props} />;
    }

    return Component;
};

export default isAuth;
