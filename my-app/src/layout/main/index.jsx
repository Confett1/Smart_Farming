import Sidebar from "./sidebar";
import Header from "./header";
import '../../styles/Header.css';
import PropTypes from 'prop-types';
import { Stack } from "@mui/material";

const Main = ( {children} ) => {
    return (
        <>
            <Sidebar />
            <Header />
            <Stack>
                {children}
            </Stack>
        </>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired, // or PropTypes.node if not required
  };

export default Main;