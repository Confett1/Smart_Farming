import PropTypes from "prop-types";

const AuthLayout = ( {children} ) => {
    return (
        <>
            <div className="bg-green-700 text-white text-xl font-bold p-1 shadow-lg flex justify-center items-center">
                SMART FARMING
                </div>

            {children}
        </>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthLayout;