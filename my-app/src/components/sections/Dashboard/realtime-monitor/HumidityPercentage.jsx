import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const humidity = 25;

const Humidity = () => {
    return (
        <>
            <div className="w-36 h-36 items-center">
                <CircularProgressbar
                    value={humidity}
                    text={`${humidity}%`}
                    styles={buildStyles({
                    pathColor: humidity > 80 ? "red" : humidity > 50 ? "orange" : "blue",
                    textColor: "white",
                    textSize:"20px",
                    trailColor: "rgba(92, 28, 95, 1)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    })}
                    strokeWidth={11.5}
                    
                />
                <h3 className="relative mt-[30px] ml-8 font-bold">Humidity</h3>
            </div>
        </>
    );
};

export default Humidity;