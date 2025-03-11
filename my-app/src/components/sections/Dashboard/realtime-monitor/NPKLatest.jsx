    import { useEffect, useState } from "react";
    import API from "../../../../api/api";
    import "../../../../styles/NutrientTable.css"
import PropTypes from "prop-types";

    const NPKLatest = ({darkModePref}) => {
        const [latestNPKReading, setLatestNPKReading] = useState({
            nitrogen: "--",
            phosphorous: "--",
            potassium: "--",
        });

        const fetchLatestReading = () => {
            API.get("/npk/latest")
            .then((response) => {
                response.data !== null
                setLatestNPKReading(response.data); 
            })
            .catch(error => console.error("Error fetching NPK data", error));
        }

        const getNitrogenLevel = (nitrogen) => {
            return nitrogen / 200 * 100;
        };

        const getPhosphorusLevel = (phosphorus) => {
            return phosphorus / 100 * 100;
        }

        const getPotassiumLevel = (potassium) => {
            return potassium / 200 * 100;
        }


        useEffect(() => {
                fetchLatestReading();
        
                const interval = setInterval(fetchLatestReading, 10000);
                return () => clearInterval(interval);
            }, []);

        return (
            <>
            <div className={`${darkModePref ? "bg-gray-100" : "bg-gray-700"} shadow-md rounded-lg hover:shadow-lg transition-all`}>
                <div className="nutrient-table h-full ">
                <h3 className="mb-5 text-lg font-bold">NPK Levels</h3>
                    <table >
                        <thead className={`${darkModePref ? "bg-[#18923a99]" :"bg-[#111a2a99]"}`}>
                                <th>Nutrient</th>
                                <th>Value (ppm)</th>
                                <th>Level</th>
                        </thead>
                        <tbody className={`${darkModePref ? "bg-gray-100" : "bg-gray-600"}`}>
                            <tr >
                                <td>Nitrogen</td>
                                <td>{latestNPKReading?.nitrogen? latestNPKReading.nitrogen : "--"}</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className="nutrient-level-fill" 
                                        style={{width: `${latestNPKReading?.nitrogen? getNitrogenLevel(latestNPKReading.nitrogen) : 0}%`}} ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Phosphorus</td>
                                <td>{latestNPKReading?.phosphorous || "--"}</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className={`nutrient-level-fill`}
                                        style={{width: `${latestNPKReading?.phosphorous? getPhosphorusLevel(latestNPKReading.phosphorous) : 0}%`}}></div>
                                    </div>
                                </td>   
                            </tr>
                            <tr>
                                <td>Potassium</td>
                                <td>{latestNPKReading?.potassium || "--"}</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className="nutrient-level-fill" style={{width: `${latestNPKReading?.potassium? getPotassiumLevel(latestNPKReading.potassium) : 0}%`}}></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    }

    NPKLatest.propTypes = {
        darkModePref: PropTypes.bool.isRequired
    }

    export default NPKLatest;