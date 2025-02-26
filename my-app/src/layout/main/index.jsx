import Sidebar from "./sidebar";
import Header from "./header";
import '../../styles/Header.css';
import PropTypes from 'prop-types';
import { Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const Main = ({ children }) => {
    const user = useAuth();

    if (!user) {
        return null;
    }

    return (
        <>
            <Sidebar userProfile={user} />
            <Header userProfile={user} />
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