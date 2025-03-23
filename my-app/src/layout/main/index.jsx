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

    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));

    return (
        <>
            <div className={`${darkModePref ? "bg-white" : "bg-gray-700"} max-h-screen`}>
                <Sidebar userProfile={user} darkModePref={darkModePref} />
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
                        overflow: 'auto',
                        bgcolor: `${darkModePref ? "#F3F3F3" : "#0000"}`,
                        minHeight: "93.1vh"
                    }}
                >
                    {children}
                </Stack>
            </div>
        </>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Main;