import ChartsContent from "./ChartsData";

const ChartsComponent = () => {
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    return (
        <>
            <header>
                <div className={`page-name ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>                    
                    <h2 >Charts Statistics</h2>
                </div>
                <div className="ml=[750px] flex-2 gap-4 controls">
                    <select className="w-full p-2 border border-gray-300 rounded bg-white" id="period-select">
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                    </select>
                    <button className="hover:bg-[var(--primary-color)] hover:text-white w-full bg-green-400 border text-[#080710] py-1.8 mx-3 text-lg rounded cursor-pointer " id="export-btn">
                        Export Data
                    </button>
                </div>
            </header>

            <ChartsContent />
        </>
    );
};

export default ChartsComponent;