import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Humidity = ({humidity, darkModePref}) => {

    return (
        <>
            <div className="flex flex-col items-center justify-center">
            <div className="w-36 h-36">
                <CircularProgressbar
                    value={humidity}
                    text={`${humidity}%`}
                        styles={buildStyles({
                        pathColor: humidity > 80 ? "red" : humidity > 50 ? "orange" : "blue",
                        textColor: humidity > 80 ? "red" : humidity > 50 ? "orange" : "blue",   
                        textSize:"20px",
                        trailColor: darkModePref ? "rgb(201, 198, 198)" : "#290829",
                    })}
                    strokeWidth={11.5}
                    
                />
                <h3 className="relative mt-[30px] ml-8 font-bold">Humidity</h3>
            </div>
            </div>
        </>
    );
};

Humidity.propTypes = {
    humidity: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired,
}

export default Humidity;