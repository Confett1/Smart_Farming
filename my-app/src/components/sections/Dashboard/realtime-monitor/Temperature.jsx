import Thermometer from "react-thermometer-component";
import "../../../../styles/Temperature.css"


const Temperature = () => {
    return (
        <>
            <div>
                <Thermometer
                    theme="light"
                    value={25}
                    max="50"
                    steps="1"
                    format="°C"
                    size="normal"
                    height="180"
                />
            </div>

        </>
    );
};

export default Temperature;