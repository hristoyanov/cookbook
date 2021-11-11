import { Link } from 'react-router-dom';

import UserNavigation from './UserNavigation/UserNavigation';
import GuestNavigation from './GuestNavigation/GuestNavigation';

import './Header.css';

const Header = (props) => {
    return (
        <header className="page-header">
            <nav className="page-header-nav">
                <div className="page-name">
                    <Link className="page-name-link" to="/">Cookbook</Link>
                </div>
                <div className="page-header-nav-links">
                    {props.user
                        ? <UserNavigation user={props.user} />
                        : <GuestNavigation />
                    }
                </div>
            </nav>

        </header>
    );
}

export default Header;
