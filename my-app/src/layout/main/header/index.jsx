import Input from '@mui/joy/Input';
import ProfileMenu from "./ProfileMenu";
import Notifications from './Notifications';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png'
import { Typography } from '@mui/material';

const Header = ({userProfile}) => {
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    return (
        <header className={`dashboard-header ${darkModePref ? "bg-gray-100 text-green-600" : "bg-gray-800 text-gray-300"}`}>
            <div className="flex items-center">
                {/* <i className="fas fa-seedling"></i> */}
                <img src={logo} className='w-11' alt="logo" />
                <Typography variant='h6' className='pl-3'>SmartFarm Hub</Typography>
            </div>
            <div className="header-controls flex items-center gap-3">
                
                <Notifications userProfile={userProfile} darkModePref={darkModePref} />
                <ProfileMenu darkModePref={darkModePref} image={userProfile} userProfile={userProfile} />
            </div>
        </header>
    );
};

Header.propTypes = {
    userProfile: PropTypes.any.isRequired
}

export default Header;
