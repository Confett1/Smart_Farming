import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const IrrigationMotor = ({darkModePref}) => {

    const status = "active";

    return (
        <>
            <div className={`status-card ${status === "inactive" ? "opacity-65" : ""} ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"} `}>
                <div className={`status-icon ${status}`}>
                    <i className="fas fa-faucet"></i>
                </div>
                <div className="status-info">
                    <h3>Irrigation Pump</h3>
                    {/* <span className={`status ${status}`}>Inactive</span> */}
                    <Typography className={`status ${status}`} sx={{textTransform: "capitalize"}}>{status}</Typography>
                </div>
            </div>
        </>
    );
};

IrrigationMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
}

export default IrrigationMotor;