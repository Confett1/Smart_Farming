import { Grid } from "@mui/material";
import NitrogenMotor from "./Nitrogen-motor/page";
import Irrigation from "./Irrigation-motor/page";
import PhosporusMotor from "./Phosporus-motor/page";
import PottasiumMotor from "./Potassium-motor/page";
import PropTypes from "prop-types";
import API from "../../../../api/api";
import { useEffect, useRef, useState } from "react";

const SystemStatus = ({darkModePref}) => {
    const [motorStatus, setMotorStatus] = useState({
        irrigationMotorStatus: '0',
        nitrogenMotorStatus: '0',
        phosphorusMotorStatus: '0',
        potassiumMotorStatus: '0',
    })
    const nitroStartTime = useRef(null);
    const phosphoStartTime = useRef(null);
    const potashStartTime = useRef(null);
    const nitroPrevState = useRef(null);
    const phosphoPrevState = useRef(null);
    const potashPrevState = useRef(null);
    const [nitroUsage, setNitroUsage] = useState(Number(localStorage.getItem("nitroUsage")) || 0);
    const [phosphoUsage, setPhosphoUsage] = useState(Number(localStorage.getItem("phosphoUsage")) || 0);
    const [potashUsage, setPotashUsage] = useState(Number(localStorage.getItem("potashUsage")) || 0);
    const lastLoggedDate = useRef(null);
    

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

    const addChartData = async() => {
        try {
            const now = Date.now();
            const response = await API.post("/charts", {
                type: "fertilizer",
                value: 0,
                timestamp: now,
                nitrogen: nitroUsage,
                phosphorus: phosphoUsage,
                potassium: potashUsage,
            })
            console.log(response.data);
        } catch (error) {
            console.error("Error adding chart data: ", error);
            
        }
    }

    useEffect(() => {
        fetchStatus();

        const interval = setInterval(fetchStatus, 10000);
        return () => {clearInterval(interval)}
    }, [])

    useEffect(() => {
        if (nitroPrevState.current == null) {
            nitroPrevState.current = motorStatus.nitrogenMotorStatus;
            return;
        }

        console.log("Nitrogen usage is at: ", potashUsage);
        

        if (nitroPrevState.current === "INACTIVE" && motorStatus.nitrogenMotorStatus === "ACTIVE") {
            nitroStartTime.current = Date.now();
        }

        if (nitroPrevState.current === "ACTIVE" && motorStatus.nitrogenMotorStatus === "INACTIVE") {
            let duration = null;
            if (nitroStartTime.current) {
                duration = ((Date.now() - nitroStartTime.current) / (1000 * 60)).toFixed(1);
                setNitroUsage(prev => prev + 2 * duration);
                console.log("Current nitrogen usage: ", nitroUsage);
            }
        }
        nitroPrevState.current = motorStatus.nitrogenMotorStatus;
    }, [motorStatus.nitrogenMotorStatus])

    useEffect(() => {
        if (phosphoPrevState.current == null) {
            phosphoPrevState.current = motorStatus.phosphorusMotorStatus;
            return;
        }
        console.log("Phosphorus usage is at: ", potashUsage);

        if (phosphoPrevState.current === "INACTIVE" && motorStatus.phosphorusMotorStatus === "ACTIVE") {
            phosphoStartTime.current = Date.now();
            console.log("goods");
            
        }

        if (phosphoPrevState.current === "ACTIVE" && motorStatus.phosphorusMotorStatus === "INACTIVE") {
            let duration = null;
            if (phosphoStartTime.current) {
                duration = ((Date.now() - phosphoStartTime.current) / (1000 * 60)).toFixed(1);
                setPhosphoUsage(prev => prev + 2 * duration);
                console.log("Current phosphorus usage: ", phosphoUsage);
            }
        }
        phosphoPrevState.current = motorStatus.phosphorusMotorStatus;
    }, [motorStatus.phosphorusMotorStatus])

    useEffect(() => {
        if (potashPrevState.current == null) {
            potashPrevState.current = motorStatus.potassiumMotorStatus;
            return;
        }

        console.log("Potassium usage is at: ", potashUsage);
        

        if (potashPrevState.current === "INACTIVE" && motorStatus.potassiumMotorStatus === "ACTIVE") {
            potashStartTime.current = Date.now();
        }

        if (potashPrevState.current === "ACTIVE" && motorStatus.potassiumMotorStatus === "INACTIVE") {
            let duration = null;
            if (potashStartTime.current) {
                duration = ((Date.now() - potashStartTime.current) / (1000 * 60)).toFixed(1);
                setPotashUsage(prev => prev + 2 * duration);
                console.log("Current potassium usage: ", potashUsage);
            }
        }
        potashPrevState.current = motorStatus.potassiumMotorStatus;
    }, [motorStatus.potassiumMotorStatus])

    useEffect(() => {
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        if (now.getHours() === 3 && now.getMinutes() === 8 && lastLoggedDate !== today) {
            addChartData();
            localStorage.removeItem("nitroUsage");
            localStorage.removeItem("phosphoUsage");
            localStorage.removeItem("potashUsage");
            lastLoggedDate.current = today;
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("nitroUsage", nitroUsage);
    }, [nitroUsage]);
    
    useEffect(() => {
        localStorage.setItem("phosphoUsage", phosphoUsage);
    }, [phosphoUsage]);
    
    useEffect(() => {
        localStorage.setItem("potashUsage", potashUsage);
    }, [potashUsage]);
    

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
