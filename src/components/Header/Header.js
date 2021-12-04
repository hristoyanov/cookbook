import {useContext} from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import UserNavigation from './UserNavigation/UserNavigation';
import GuestNavigation from './GuestNavigation/GuestNavigation';

import './Header.css';

const Header = () => {
    const user = useContext(AuthContext);

    return (
        <header className="page-header">
            <nav className="page-header-nav">
                <div className="page-name">
                    <Link className="page-name-link" to="/recipes">Cookbook</Link>
                </div>
                <div className="page-header-nav-links">
                    {user && user.email
                        ? <UserNavigation user={user} />
                        : <GuestNavigation />
                    }
                </div>
            </nav>

        </header>
    );
}

export default Header;
