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
              
                    <button className="control-btn" id="startIrrigation">
                        <i className="fas fa-power-off"></i> 
                    </button>
                </div>
            </div>
        </>
    );
};

export default IrrigationControl;