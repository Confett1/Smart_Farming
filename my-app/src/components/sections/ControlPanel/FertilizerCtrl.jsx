const FertilizerControl = () => {
    return (
        <>
            {/*<!-- Fertilizer Control -->*/}
            <div className="control-card">
                <div className="card-header">
                    <h3><i className="fas fa-flask"></i> Fertilizer</h3>
                    <span className="status warning">Low Supply</span>
                </div>
                <div className="control-body">
                    <div className="control-item">
                        <label>Fertilizer Mix</label>
                        <select id="fertilizerMix">
                            <option value="npk">NPK Mix</option>
                            <option value="nitrogen">Nitrogen Rich</option>
                            <option value="phosphorus">Phosphorus Rich</option>
                        </select>
                    </div>
                    <div className="control-item">
                        <label>Application Rate</label>
                        <input type="range" min="0" max="100" value="60" className="slider" id="fertilizerRate" />
                        <span className="value">60%</span>
                    </div>
                    <button className="control-btn" id="startFertilizer">
                        <i className="fas fa-spray-can"></i> Apply Fertilizer
                    </button>
                </div>
            </div>
        </>
    );
};

export default FertilizerControl;