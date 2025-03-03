import Input from '@mui/joy/Input';
import ProfileMenu from "./ProfileMenu";
import Notifications from './Notifications';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png'
import { Typography } from '@mui/material';

const Header = ({userProfile}) => {

    return (
        <header className="dashboard-header">
            <div className="header-title">
                {/* <i className="fas fa-seedling"></i> */}
                <img src={logo} className='w-11' alt="logo" />
                <Typography variant='h6'>SmartFarm Hub</Typography>
            </div>
            <div className="header-controls flex items-center gap-3">

                <div className="search-bar">
                    <Input
                        placeholder="Search..."
                        sx={{
                            '--Input-focusedInset': 'var(--any, 0)',
                            '--Input-focusedThickness': '0.25rem',
                            '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
                            '& .MuiInput-underline:before': {
                                borderBottomColor: '#F5F5F5',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#ff5733',
                            },
                            '&:focus-within': {
                                borderColor: '#32CD32',
                                color: "#138808"
                            },
                            backgroundColor: "#F5F5F5",
                            borderRadius: 30,
                            fontSize: 14,
                            px: 2,
                            py: 1,
                            width: 250
                        }}
                    />
                </div>
                
                <Notifications userProfile={userProfile} />
                <ProfileMenu image={userProfile} userProfile={userProfile} />
            </div>
        </header>
    );
};

Header.propTypes = {
    userProfile: PropTypes.any.isRequired
}

export default Header;
