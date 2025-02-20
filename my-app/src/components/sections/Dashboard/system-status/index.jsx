import { Grid } from "@mui/material";
import NpkLevels from "./npk-levels/page";
import Irrigation from "./irrigation/page";
import Solar from "./solar/page";

const SystemStatus = () => {
    return (
        <section className="status-overview">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={4}>
                    <NpkLevels />
                </Grid>

                <Grid item xs={12} md={4} xl={4}>
                    <Irrigation />
                </Grid>

                <Grid item xs={12} md={4} xl={4}>
                    <Solar />
                </Grid>
            </Grid>
        </section>
    );
}

export default SystemStatus;
