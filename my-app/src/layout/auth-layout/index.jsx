import PropTypes from "prop-types";

const AuthLayout = ( {children} ) => {
    return (
        <>
            <div>SMART FARMING</div>
            {children}
        </>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthLayout;