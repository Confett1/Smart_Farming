import { Typography } from "@mui/material";

const ControlCenter = () => {
    return (
        <>
            <section className="control-center">
            <Typography
                    sx={{
                        textAlign: 'left',
                        fontWeight: 600,
                        mb: -1.5
                    }}
                >
                    Control Center
                </Typography>
                <div className="control-grid">
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
                </div>
            </section>
        </>
    );
}

export default ControlCenter;