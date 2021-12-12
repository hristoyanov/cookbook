import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/services';
import UserNavigation from './UserNavigation/UserNavigation';
import GuestNavigation from './GuestNavigation/GuestNavigation';

import './Header.css';


const Header = () => {
    const [userProfile, setUserProfile] = useState({});

    const user = useAuthContext();
    const location = useLocation();

    useEffect(() => {
        if (user && user.uid) {
            getUserProfile(user.uid)
                .then(res => {
                    setUserProfile(res);
                })
                .catch(error => console.log(error));
        }
    }, [user]);

    return (
        location.pathname === "/"
            ? null
            :
            <header className="page-header">
                <nav className="page-header-nav">
                    <div className="page-name">
                        <Link className="page-name-link" to="/recipes">Cookbook</Link>
                    </div>
                    <div className="page-header-nav-links">
                        <ul className="page-header-nav-links-list">
                            {user && user.email
                                ? <UserNavigation userProfile={userProfile} />
                                : <GuestNavigation />
                            }
                        </ul>
                    </div>
                </nav>

            </header>
    );
}

export default Header;
