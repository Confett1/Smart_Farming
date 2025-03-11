import PropTypes from "prop-types";
import Thermometer from "react-thermometer-component";


const Temperature = ({temperature , darkModePref}) => {
    return (
        <>
            <div >
                <Thermometer
                    theme={`${darkModePref ? "light" : "dark"}`}
                    value={temperature}
                    max="50"
                    steps="1"
                    format="°C"
                    size="normal"
                    height="180"
                />
                <h3 className="mt-4 font-bold">Temperature</h3>
            </div>

        </>
    );
};

Temperature.propTypes = {
    temperature: PropTypes.any.isRequired,
    darkModePref: PropTypes.bool.isRequired
}

export default Temperature;