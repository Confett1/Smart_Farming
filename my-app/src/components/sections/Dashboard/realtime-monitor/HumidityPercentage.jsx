import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const humidity = 90;

const Humidity = () => {
    return (
        <>
            <div className="w-36 h-36">
                <CircularProgressbar
                    value={humidity}
                    text={`${humidity}%`}
                    styles={buildStyles({
                    pathColor: humidity > 80 ? "red" : humidity > 50 ? "orange" : "blue",
                    textColor: "transparent",
                    trailColor: "rgba(92, 28, 95, 1)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    })}
                    strokeWidth={11.5}
                    
                />
                <div className="absolute mt-14 text inset-0 flex items-center justify-center text-white font-bold text-[24px]">
                    {humidity}%
                </div>
            </div>
        </>
    );
};

export default Humidity;