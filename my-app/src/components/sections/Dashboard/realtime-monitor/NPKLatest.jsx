    import { useEffect, useState } from "react";
    import API from "../../../../api/api";
    import "../../../../styles/NutrientTable.css"

    const NPKLatest = () => {
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
            <div className="shadow-md bg-gray-100 rounded-lg hover:shadow-lg transition-all">
                <div className="nutrient-table h-full">
                <h3 className="mb-5 text-lg text-black font-bold">NPK Levels</h3>
                    <table >
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Value</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nitrogen</td>
                                <td>{latestNPKReading?.nitrogen? latestNPKReading.nitrogen : "--"} ppm</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className="nutrient-level-fill" 
                                        style={{width: `${latestNPKReading?.nitrogen? getNitrogenLevel(latestNPKReading.nitrogen) : 0}%`}} ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Phosphorus</td>
                                <td>{latestNPKReading?.phosphorous || "--"} ppm</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className={`nutrient-level-fill`}
                                        style={{width: `${latestNPKReading?.phosphorous? getPhosphorusLevel(latestNPKReading.phosphorous) : 0}%`}}></div>
                                    </div>
                                </td>   
                            </tr>
                            <tr>
                                <td>Potassium</td>
                                <td>{latestNPKReading?.potassium || "--"} ppm</td>
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

    export default NPKLatest;