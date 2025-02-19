import { useEffect, useState } from 'react';
import '../../styles/Water Level.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';

const WaterLevel = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="layout">
        {/*<!-- Main Content -->*/}
        <div className="content">

          {/*<!-- Body content -->*/}

          {/*<!-- Real-time Monitoring -->*/}
          <section className="monitoring">
            <h2 className="section-title">Real-time Monitoring</h2>
            <div className="monitoring-grid">
              {/*<!-- Field Water Level Monitoring Card -->*/}
              <div className="card field-water-card">
                <div className="card-header">
                  <h3>Water Level Monitoring</h3>
                </div>
                <div className="card-body">
                  <div className="field-monitoring-grid">
                    <div className="field-plot" data-water-level="85">
                      <div className="field-container">
                        <div className="field-visual">
                          <div className="water-overlay">
                            <div className="water-ripples"></div>
                          </div>
                          <div className="level-indicator">
                            <div className="level-marks">
                              <span className="mark overflow">15cm</span>
                              <span className="mark optimal">10cm</span>
                              <span className="mark minimum">5cm</span>
                            </div>
                          </div>
                        </div>
                        <div className="plot-info">
                          <div className="water-stats">
                            <span className="current-status optimal">Optimal Level</span>
                            <span className="water-depth">Water Depth: 12cm</span>
                          </div>
                          <div className="drainage-status">
                            <i className="fas fa-water"></i>
                            <span>Drainage Gate: Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field-overview">
                    <div className="overview-stats">
                      <div className="stat-row">
                        <div className="stat-item">
                          <i className="fas fa-chart-line"></i>
                          <div className="stat-info">
                            <span className="stat-label">Average Water Level</span>
                            <div className="stat-value">10.5 cm</div>
                          </div>
                        </div>
                        <div className="stat-item">
                          <i className="fas fa-history"></i>
                          <div className="stat-info">
                            <span className="stat-label">Last Drainage</span>
                            <div className="stat-value">2h ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/*<!-- Weather Forecast Card -->*/}
              <div className="card weather-card">
                <div className="card-header">
                  <h3>Weather Forecast</h3>
                </div>
                <div className="card-body">
                  <div className="current-weather">
                    <div className="weather-primary">
                      <div className="weather-icon">
                        <i className="fas fa-sun"></i>
                      </div>
                      <div className="weather-info">
                        <div className="temperature">28°C</div>
                        <div className="condition">Sunny</div>
                      </div>
                    </div>
                    <div className="weather-details">
                      <div className="detail-item">
                        <i className="fas fa-tint"></i>
                        <span>Humidity: 75%</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-wind"></i>
                        <span>Wind: 5 km/h</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-cloud-rain"></i>
                        <span>Rain Chance: 20%</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-sun"></i>
                        <span>UV Index: 6</span>
                      </div>
                    </div>
                  </div>
                  <div className="forecast-grid">
                    <div className="forecast-day">
                      <span className="day">Monday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <div className="main-content">
            {/*<!-- Control Panels -->*/}
            <section className="control-center">
              <h2 className="section-title">Control Center</h2>
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
          </div>
        <Footer />
        </div>
      </div>

      <script src="Water level.js"></script>
    </>
  );
};

export default WaterLevel;