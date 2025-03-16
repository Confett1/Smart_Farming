import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const NitrogenMotor = ({darkModePref}) => {

    const status = "inactive";
    
    return (
        <>
            <div className={`status-card ${status === "inactive" ? "opacity-65" : "" } ${darkModePref ? "bg-gray-100" : "bg-gray-800 text-gray-300"}`}>
                <div className={`status-icon ${status}`}>
                    <i className="fas fa-seedling"></i>
                </div>
                <div className="status-info">
                    <h3>Nitrogen Pump</h3>
                    {/* <span className={`status ${status}`}>Inactive</span> */}
                    <Typography className={`status ${status}`} sx={{textTransform: "capitalize"}}>{status}</Typography>
                </div>
            </div>
        </>
    );
};


NitrogenMotor.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
}

export default NitrogenMotor;