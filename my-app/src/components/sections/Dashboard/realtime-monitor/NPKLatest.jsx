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
            <div className="bg-gray-100 border rounded-lg">
                <div className="nutrient-table">
                <h2 className="mb-5 text-lg text-black font-bold">Npk Levels</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Value</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nitrogen (N)</td>
                                <td>{latestNPKReading.nitrogen} ppm</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className="nutrient-level-fill" 
                                        style={{width: `${getNitrogenLevel(latestNPKReading.nitrogen)}%`}} ></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Phosphorus (P)</td>
                                <td>{latestNPKReading.phosphorous} ppm</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className={`nutrient-level-fill`} style={{width: `${getPhosphorusLevel(latestNPKReading.phosphorous)}%`}}></div>
                                    </div>
                                </td>   
                            </tr>
                            <tr>
                                <td>Potassium (K)</td>
                                <td>{latestNPKReading.potassium} ppm</td>
                                <td>
                                    <div className="nutrient-level">
                                        <div className="nutrient-level-fill" style={{width: `${getPotassiumLevel(latestNPKReading.potassium)}%`}}></div>
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