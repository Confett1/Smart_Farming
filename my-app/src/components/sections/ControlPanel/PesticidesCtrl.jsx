const PesticidesControl = () => {
    return (
        <>
            {/*<!-- Pest Control (New) -->*/}
            <div className="control-card">
                <div className="card-header">
                    <h3><i className="fas fa-bug"></i> Pest Control</h3>
                    <span className="status">Ready</span>
                </div>
                <div className="control-body">
                    <div className="control-item">
                        <label>Treatment Type</label>
                        <select id="pestControl">
                            <option value="organic">Organic Treatment</option>
                            <option value="chemical">Chemical Treatment</option>
                            <option value="biological">Biological Control</option>
                        </select>
                    </div>
                    <div className="control-item">
                        <label>Coverage Area</label>
                        <input type="range" min="0" max="100" value="75" className="slider" id="coverageArea" />
                        <span className="value">75%</span>
                    </div>
                    <button className="control-btn" id="startPestControl">
                        <i className="fas fa-shield-alt"></i> Apply Treatment
                    </button>
                </div>
            </div>
        </>
    );
};

export default PesticidesControl;