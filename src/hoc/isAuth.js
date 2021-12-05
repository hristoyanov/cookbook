import { Redirect } from 'react-router-dom';


const isAuth = (InnerComponent) => {
    const Component = (props) => {
        return localStorage.getItem('user')
            ? <InnerComponent {...props} />
            : <Redirect to="/sign-in" />
    }

    return Component;
};

export default isAuth;
