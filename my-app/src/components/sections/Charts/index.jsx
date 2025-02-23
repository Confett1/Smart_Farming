import ChartsContent from "./ChartsData";

const ChartsComponent = () => {
    return (
        <>
            <header>
                <div className="page-name">                    
                    <h2>Charts Statistics</h2>
                </div>
                <div className="controls">
                    <select id="period-select">
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                    </select>
                    <button id="export-btn">Export Data</button>
                </div>
            </header>

            <ChartsContent />
        </>
    );
};

export default ChartsComponent;