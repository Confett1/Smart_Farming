import Sidebar from "./sidebar/Sidebar";
import Header from "./top/Header";
import '../../styles/Header.css';
import PropTypes from 'prop-types';

const Main = ( {children} ) => {
    return (
        <>
            <Sidebar />
            <Header />
            
            <div>
                {children}
            </div>
        </>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired, // or PropTypes.node if not required
  };

export default Main;