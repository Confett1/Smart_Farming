const IrrigationControl = () => {
    return (
        <>
            {/*<!-- Irrigation Control -->*/}
            <div className="control-card">
                <div className="card-header">
                    <h3><i className="fas fa-tint"></i> Irrigation</h3>
                    <span className="status active">Active</span>
                </div>
                <div className="control-body">
                    <div className="control-item">
                        <label>Water Flow Rate</label>
                        <input type="range" min="0" max="100" value="50" className="slider" id="waterFlow" />
                        <span className="value">50%</span>
                    </div>
                    <div className="control-item">
                        <label>Schedule</label>
                        <select id="irrigationSchedule">
                            <option value="1">Every 1 hour</option>
                            <option value="2">Every 2 hours</option>
                            <option value="4">Every 4 hours</option>
                        </select>
                    </div>
                    <button className="control-btn" id="startIrrigation">
                        <i className="fas fa-play"></i> Start Irrigation
                    </button>
                </div>
            </div>
        </>
    );
};

export default IrrigationControl;