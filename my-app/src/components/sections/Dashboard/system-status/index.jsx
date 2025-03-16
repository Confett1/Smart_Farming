import { Grid } from "@mui/material";
import NitrogenMotor from "./Nitrogen-motor/page";
import Irrigation from "./Irrigation-motor/page";
import PhosporusMotor from "./Phosporus-motor/page";
import PottasiumMotor from "./Potassium-motor/page";
import PropTypes from "prop-types";

const SystemStatus = ({darkModePref}) => {
    return (
        <Grid container spacing={3} className="flex justify-center">
            <Grid item  >
                <Irrigation darkModePref={darkModePref}/>
            </Grid>

            <Grid item>
                <NitrogenMotor darkModePref={darkModePref} />
            </Grid>

            <Grid item>
                <PhosporusMotor darkModePref={darkModePref} />
            </Grid>

            <Grid item >
                <PottasiumMotor darkModePref={darkModePref} />
            </Grid>
        </Grid>
    );
}

SystemStatus.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
};

export default SystemStatus;
