import PropTypes from "prop-types";
import logo from "../../assets/images/logo.png";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const AuthLayout = ({ children }) => {
    return (
        <>
            <Stack
                bgcolor={"transparent"}
                mx={7}
                my={1}
                sx={{
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: "center",
                }}>
                <Avatar src={logo} />
                <Typography 
                    variant="body"
                    className="text-green-600"
                    mt={1}
                    mx={1.5}
                    fontWeight={600}
                    fontSize={22}
                >
                    SMART FARMING
                </Typography>
            </Stack>

            {children}
        </>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthLayout;