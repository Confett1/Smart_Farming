//     import { useEffect, useState } from "react";
//     import API from "../../../../api/api";
//     import "../../../../styles/NutrientTable.css"
// import PropTypes from "prop-types";

//     const NPKLatest = ({darkModePref}) => {
//         const [latestNPKReading, setLatestNPKReading] = useState({
//             nitrogen: "--",
//             phosphorous: "--",
//             potassium: "--",
//         });

//         const fetchLatestReading = () => {
//             API.get("/npk/latest")
//             .then((response) => {
//                 response.data !== null
//                 setLatestNPKReading(response.data); 
//             })
//             .catch(error => console.error("Error fetching NPK data", error));
//         }

//         const getNitrogenLevel = (nitrogen) => {
//             return nitrogen / 200 * 100;
//         };

//         const getPhosphorusLevel = (phosphorus) => {
//             return phosphorus / 100 * 100;
//         }

//         const getPotassiumLevel = (potassium) => {
//             return potassium / 200 * 100;
//         }


//         useEffect(() => {
//                 fetchLatestReading();
        
//                 const interval = setInterval(fetchLatestReading, 10000);
//                 return () => clearInterval(interval);
//             }, []);

//         return (
//             <>
//             <div className={`${darkModePref ? "bg-gray-100" : "bg-gray-700"} shadow-md rounded-lg hover:shadow-lg transition-all nutrient-grid`}>
//                 <div className="nutrient-table h-full ">
//                 <h3 className="mb-5 text-lg font-bold">NPK Levels</h3>
//                     <table >
//                         <thead className={`${darkModePref ? "bg-[#18923a99]" :"bg-[#111a2a99]"}`}>
//                                 <tr>
//                                     <th>Nutrient</th>
//                                     <th>Value (ppm)</th>
//                                     <th>Level</th>
//                                 </tr>
//                         </thead>
//                         <tbody className={`${darkModePref ? "bg-gray-100" : "bg-gray-600"}`}>
//                             <tr >
//                                 <td>Nitrogen</td>
//                                 <td>{latestNPKReading?.nitrogen? latestNPKReading.nitrogen : "--"}</td>
//                                 <td>
//                                     <div className="nutrient-level">
//                                         <div className="nutrient-level-fill" 
//                                         style={{width: `${latestNPKReading?.nitrogen? getNitrogenLevel(latestNPKReading.nitrogen) : 0}%`}} ></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Phosphorus</td>
//                                 <td>{latestNPKReading?.phosphorous || "--"}</td>
//                                 <td>
//                                     <div className="nutrient-level">
//                                         <div className={`nutrient-level-fill`}
//                                         style={{width: `${latestNPKReading?.phosphorous? getPhosphorusLevel(latestNPKReading.phosphorous) : 0}%`}}></div>
//                                     </div>
//                                 </td>   
//                             </tr>
//                             <tr>
//                                 <td>Potassium</td>
//                                 <td>{latestNPKReading?.potassium || "--"}</td>
//                                 <td>
//                                     <div className="nutrient-level">
//                                         <div className="nutrient-level-fill" style={{width: `${latestNPKReading?.potassium? getPotassiumLevel(latestNPKReading.potassium) : 0}%`}}></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             </>
//         );
//     }

//     NPKLatest.propTypes = {
//         darkModePref: PropTypes.bool.isRequired
//     }

//     export default NPKLatest;


// import { useEffect, useState } from "react";
// import API from "../../../../api/api";
// import "../../../../styles/NutrientTable.css";
// import PropTypes from "prop-types";

// const NPKLatest = ({ darkModePref }) => {
//     const [latestNPKReading, setLatestNPKReading] = useState({
//         nitrogen: "--",
//         phosphorous: "--",
//         potassium: "--",
//     });

//     const fetchLatestReading = () => {
//         API.get("/npk/latest")
//             .then((response) => {
//                 if (response.data !== null) {
//                     setLatestNPKReading(response.data);
//                 }
//             })
//             .catch((error) => console.error("Error fetching NPK data", error));
//     };

//     const getNutrientLevel = (value, max) => (value / max) * 100;

//     useEffect(() => {
//         fetchLatestReading();
//         const interval = setInterval(fetchLatestReading, 10000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div
//             className={`p-5 rounded-lg shadow-lg transition-all ${
//                 darkModePref ? "bg-gray-100 text-black" : "bg-gray-700 text-white"
//             }`}
//         >
//             <h3 className="mb-5 text-lg font-bold">NPK Levels</h3>
//             <div className="m-2 rounded-lg">
//                 <table className="w-full">
//                     <thead>
//                         <tr className={`text-left ${darkModePref ? "bg-green-700 text-white" : "bg-blue-900 text-gray-200"}`}>
//                             <th className="px-2">Nutrient</th>
//                             <th className="text-center">Value (ppm)</th>
//                             <th className="px-15 py-3 text-center">Level</th>
//                         </tr>
//                     </thead>
//                     <tbody className={darkModePref ? "bg-gray-100" : "bg-gray-700"}>
//                         {[
//                             { name: "Nitrogen", value: latestNPKReading?.nitrogen, max: 200 },
//                             { name: "Phosphorus", value: latestNPKReading?.phosphorous, max: 100 },
//                             { name: "Potassium", value: latestNPKReading?.potassium, max: 200 },
//                         ].map((nutrient, index) => (
//                             <tr key={index} className={`border-b hover:bg-opacity-20 ${darkModePref ? "hover:bg-green-300" : "hover:bg-gray-500"} transition`}>
//                                 <td className="pl-3">{nutrient.name}</td>
//                                 <td className=" py-5 text-center">{nutrient.value || "--"}</td>
//                                 <td className="px-3">
//                                     <div className="w-full max-w-[250px] sm:max-w-[150px]  h-3 bg-gray-300 rounded-lg overflow-hidden">
//                                         <div
//                                             className="h-full bg-gradient-to-r from-blue-400 to-green-500 transition-all"
//                                             style={{ width: `${nutrient.value ? getNutrientLevel(nutrient.value, nutrient.max) : 0}%` }}
//                                         ></div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// NPKLatest.propTypes = {
//     darkModePref: PropTypes.bool.isRequired,
// };

// export default NPKLatest;


import { useEffect, useState } from "react";
import API from "../../../../api/api";
import "../../../../styles/NutrientTable.css";
import PropTypes from "prop-types";

const NPKLatest = ({ darkModePref }) => {
    const [latestNPKReading, setLatestNPKReading] = useState({
        nitrogen: "--",
        phosphorous: "--",
        potassium: "--",
    });

    const fetchLatestReading = () => {
        API.get("/npk/latest")
            .then((response) => {
                if (response.data !== null) {
                    setLatestNPKReading(response.data);
                }
            })
            .catch((error) => console.error("Error fetching NPK data", error));
    };

    const getNutrientLevel = (value, max) => (value / max) * 100;

    useEffect(() => {
        fetchLatestReading();
        const interval = setInterval(fetchLatestReading, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`p-5 rounded-lg shadow-lg transition-all ${
                darkModePref ? "bg-gray-100 text-black" : "bg-gray-700 text-white"} w-full max-w-2xl mx-auto`}
        >
            <h3 className="mb-5 text-lg font-bold text-center sm:text-left">NPK Levels</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className={`text-left ${darkModePref ? "bg-green-700 text-white" : "bg-blue-900 text-gray-200"}`}>
                            <th className="px-2 py-2">Nutrient</th>
                            <th className="text-center py-2">Value (ppm)</th>
                            <th className="px-10 text-center">Level</th>
                        </tr>
                    </thead>
                    <tbody className={darkModePref ? "bg-gray-100" : "bg-gray-700"}>
                        {[
                            { name: "Nitrogen", value: latestNPKReading?.nitrogen, max: 200 },
                            { name: "Phosphorus", value: latestNPKReading?.phosphorous, max: 100 },
                            { name: "Potassium", value: latestNPKReading?.potassium, max: 200 },
                        ].map((nutrient, index) => (
                            <tr
                                key={index}
                                className={`border-b hover:bg-opacity-20 ${
                                    darkModePref ? "hover:bg-green-300" : "hover:bg-gray-500"
                                } transition`}
                            >
                                <td className="pl-3 py-3 text-sm sm:text-base">{nutrient.name}</td>
                                <td className="py-3 text-center text-sm sm:text-base">{nutrient.value || "--"}</td>
                                <td className="px-3">
                                    <div className="w-full max-w-[250px] sm:max-w-[150px] h-3 bg-gray-300 rounded-lg overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-400 to-green-500 transition-all"
                                            style={{ width: `${nutrient.value ? getNutrientLevel(nutrient.value, nutrient.max) : 0}%` }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

NPKLatest.propTypes = {
    darkModePref: PropTypes.bool.isRequired,
};

export default NPKLatest;