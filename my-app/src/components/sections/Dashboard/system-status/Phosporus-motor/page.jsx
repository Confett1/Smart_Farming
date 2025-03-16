import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const PhosporusMotor = ({darkModePref}) => {

    const status = "active";
    return (
        <>
            <div className={`status-card ${status === "inactive" ? "opacity-65" : ""} ${darkModePref ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}>
                <div className={`status-icon ${status}`}>
                    <i className="fas fa-seedling"></i>
                </div>
                <div className="status-info">
                    <h3>Phosphorus Pump</h3>
                    {/* <span className={`status ${status}`}>{status}</span> */}
                    <Typography className={`status ${status}`} sx={{textTransform: "capitalize"}}>{status}</Typography>
                </div>
            </div>
        </>
    );
};


PhosporusMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
}

export default PhosporusMotor;