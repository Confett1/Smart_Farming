import { Grid } from "@mui/material";
import NitrogenMotor from "./Nitrogen-motor/page";
import Irrigation from "./Irrigation-motor/page";
import PhosporusMotor from "./Phosporus-motor/page";
import PottasiumMotor from "./Potassium-motor/page";
import PropTypes from "prop-types";
import API from "../../../../api/api";
import { useEffect, useState } from "react";
const SystemStatus = ({darkModePref}) => {

    const [motorStatus, setMotorStatus] = useState({
        irrigationMotorStatus: '0',
        nitrogenMotorStatus: '0',
        phosphorusMotorStatus: '0',
        potassiumMotorStatus: '0',
    }) 
    

    const fetchStatus = async() => {
        API.get("/motorStatus")
        .then((response) => {
            
            setMotorStatus(prevState => ({
                ...prevState,  // Keep previous values
                ...response.data // Update with new values
            }));
        })
        .catch(error => console.error("Error fetching motor status data", error));
    }

    useEffect(() => {
        fetchStatus();

        const interval = setInterval(fetchStatus, 10000);
        return () => {clearInterval(interval)}
    }, [])

    return (
        <Grid container spacing={3} className="flex justify-center">
            <Grid item  >
                <Irrigation darkModePref={darkModePref} motorStatusId={motorStatus.motorStatusId} irrigationMotorStatus={motorStatus.irrigationMotorStatus}/>
            </Grid>

            <Grid item>
                <NitrogenMotor darkModePref={darkModePref} motorStatusId={motorStatus.motorStatusId} nitrogenMotorStatus={motorStatus.nitrogenMotorStatus} />
            </Grid>

            <Grid item>
                <PhosporusMotor darkModePref={darkModePref} motorStatusId={motorStatus.motorStatusId} phosphorusMotorStatus={motorStatus.phosphorusMotorStatus} />
            </Grid>

            <Grid item >
                <PottasiumMotor darkModePref={darkModePref} motorStatusId={motorStatus.motorStatusId} potassiumMotorStatus={motorStatus.potassiumMotorStatus} />
            </Grid>
        </Grid>
    );
}

SystemStatus.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
};

export default SystemStatus;
