import Thermometer from "react-thermometer-component";


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
                <h3 className="mt-4 font-bold">Temperature</h3>
            </div>

        </>
    );
};

export default Temperature;