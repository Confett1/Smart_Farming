// import { useState } from "react";
// import ChartsContent from "./ChartsData";
// import Report from "./Report";
// import HarvestInput from "./HarvestInput";

// const ChartsComponent = () => {
//     const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
//     const [selectedPeriod, setSelectedPeriod] = useState("currentWeek");
//     const [showReport, setShowReport] = useState(false); // State to control report visibility

//     const handleExport = () => {
//         setShowReport(true); // Show the report when export is clicked
//     };

//     const refreshCharts = () => {
//         // This function will be passed to HarvestInput to refresh charts
//         // The actual implementation would need to be passed down to ChartsContent
//         // or you could use a state management solution
//         console.log("Refresh charts after harvest input");
//     };


//     return (
//         <>
//             <header>
//                 <div className={`page-name flex items-center justify-between ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>                    
//                     <h2>Charts Statistics</h2>
//                     <div className="harvest-input-container">
//                             <HarvestInput onSave={refreshCharts} />
//                     </div>
//                     <div className="controls">
//                         <select 
//                             className={`"w-full p-2 border rounded-lg cursor-pointer text-sm  ${darkModePref ? "bg-white  border-gray-300 text-gray-700" : "bg-gray-800 border-gray-200 text-gray-200"}`}
//                             id="period-select"
//                             value={selectedPeriod}
//                             onChange={(e) => setSelectedPeriod(e.target.value)}
//                         >
//                             <option value="currentWeek">Current Week</option>
//                             <option value="lastWeek">Last Week</option>
//                             <option value="lastMonth">Last Month</option>
//                             <option value="lastYear">Last Year</option>
//                         </select>
//                         <button 
//                             className="hover:bg-[var(--primary-color)] hover:text-white w-full bg-green-400 border text-gray-700 py-1.8 mx-3 text-sm rounded-lg cursor-pointer duration-300" 
//                             id="export-btn"
//                             onClick={handleExport} // Trigger export on click
//                         >
//                             Export Data
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             <ChartsContent selectedPeriod={selectedPeriod} darkModePref={darkModePref} />

//             {/* Conditionally render the Report component */}
//             {showReport && <Report selectedPeriod={selectedPeriod} onClose={() => setShowReport(false)} />}
//         </>
//     );
// };

// export default ChartsComponent;

// ChartsComponent.jsx
import { useState } from "react";
import ChartsContent from "./ChartsData";
import Report from "./Report";
import HarvestInput from "./HarvestInput";

const ChartsComponent = () => {
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    const [selectedPeriod, setSelectedPeriod] = useState("currentWeek");
    const [showReport, setShowReport] = useState(false);

    const handleExport = () => {
        setShowReport(true);
    };

    const refreshCharts = () => {
        console.log("Refreshing charts after harvest input"); // ✅ Notify that charts should update
    };

    return (
        <>
            <header>
                <div className={`page-name flex items-center justify-between ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>                    
                    <h2>Charts Statistics</h2>
                    <div className="harvest-input-container">
                        <HarvestInput onSave={refreshCharts} /> {/* ✅ Pass refresh function */}
                    </div>
                    <div className="controls">
                        <select 
                            className={`w-full p-2 border rounded-lg cursor-pointer text-sm  ${darkModePref ? "bg-white border-gray-300 text-gray-700" : "bg-gray-800 border-gray-200 text-gray-200"}`}
                            id="period-select"
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="currentWeek">Current Week</option>
                            <option value="lastWeek">Last Week</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="lastYear">Last Year</option>
                        </select>
                        <button 
                            className="hover:bg-[var(--primary-color)] hover:text-white w-full bg-green-400 border text-gray-700 py-1.8 mx-3 text-sm rounded-lg cursor-pointer duration-300" 
                            id="export-btn"
                            onClick={handleExport}
                        >
                            Export Data
                        </button>
                    </div>
                </div>
            </header>

            <ChartsContent selectedPeriod={selectedPeriod} darkModePref={darkModePref} />

            {showReport && <Report selectedPeriod={selectedPeriod} onClose={() => setShowReport(false)} />}
        </>
    );
};

export default ChartsComponent;
