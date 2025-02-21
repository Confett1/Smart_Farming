import Sidebar from "./sidebar";
import Header from "./header";
import '../../styles/Header.css';
import PropTypes from 'prop-types';
import { Stack } from "@mui/material";
import ProfileImage from '../../assets/images/john lee.jpg';

const Main = ({ children }) => {
    return (
        <>
            <Sidebar userProfile={ProfileImage} />
            <Header userProfile={ProfileImage} />
            <Stack
                sx={{
                    ml: {
                        xs: 0,
                        sm: 0,
                        md: '260px',
                        lg: '260px'
                    },
                    flex: 1,
                    overflow: 'hidden',
                    bgcolor: '#F3F3F3'
                }}
            >
                {children}
            </Stack>
        </>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Main;