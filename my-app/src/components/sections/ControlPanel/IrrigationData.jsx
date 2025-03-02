import { useState } from 'react';

const IrrigationContent = () => {
  const [fertilizerSchedule, setFertilizerSchedule] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [pesticideSchedule, setPesticideSchedule] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [waterFlowRate, setWaterFlowRate] = useState(50);
  const [fertilizerRate, setFertilizerRate] = useState(60);
  const [coverageArea, setCoverageArea] = useState(75);

  const handleScheduleChange = (scheduleType, day) => {
    if (scheduleType === 'fertilizer') {
      setFertilizerSchedule((prevState) => ({
        ...prevState,
        [day]: !prevState[day],
      }));
    } else {
      setPesticideSchedule((prevState) => ({
        ...prevState,
        [day]: !prevState[day],
      }));
    }
  };

  const daysOfWeek = [
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'Th', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'Sa', full: 'Saturday' },
    { short: 'Su', full: 'Sunday' },
  ];

  return (
    <>
      <div>
        <section>
          <h2 className="section-title">Control Center</h2>
          <div className="control-grid">
            {/* Irrigation Control */}
            <div className="control-card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-tint"></i> Irrigation
                </h3>
                <span className="status active">Active</span>
              </div>
              <div className="control-body">
                <div className="control-item">
                  <label>Water Flow Rate</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={waterFlowRate}
                    className="slider"
                    id="waterFlow"
                    onChange={(e) => setWaterFlowRate(e.target.value)}
                  />
                  <span className="value">{waterFlowRate}%</span>
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

            {/* Fertilizer Control */}
            <div className="control-card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-flask"></i> Fertilizer
                </h3>
                <span className="status warning">Low Supply</span>
              </div>
              <div className="control-body">
                <div className="control-item">
                <label>Fertilizer Schedule</label>
                </div>
                <div className="control-item">
                  <div className="Daysbutton">
                    {daysOfWeek.map(({ short, full }) => (
                      <div key={full}>
                        <input
                          type="radio"
                          id={`fertilizer-${short}`}
                          name="fertilizerSchedule"
                          checked={fertilizerSchedule[full]}
                          onChange={() => handleScheduleChange('fertilizer', full)}
                        />
                        <label htmlFor={`fertilizer-${short}`}>{short}</label>
                      </div>
                    ))}
                  </div>
                </div>
                  <label>Application Rate</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fertilizerRate}
                    className="slider"
                    id="fertilizerRate"
                    onChange={(e) => setFertilizerRate(e.target.value)}
                  />
                  <span className="value">{fertilizerRate}%</span>
                </div>
                <button className="control-btn" id="startFertilizer">
                  <i className="fas fa-spray-can"></i> Apply Fertilizer
                </button>
            </div>

            {/* Pest Control */}
            <div className="control-card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-bug"></i> Pest Control
                </h3>
                <span className="status">Ready</span>
              </div>
              <div className="control-body">
                <div className="control-item">
                  <label>Pesticide Schedule</label>
                  <div className="Daysbutton">
                    {daysOfWeek.map(({ short, full }) => (
                      <div key={full}>
                        <input
                          type="radio"
                          id={`pesticide-${short}`}
                          name="pesticideSchedule"
                          checked={pesticideSchedule[full]}
                          onChange={() => handleScheduleChange('pesticide', full)}
                        />
                        <label htmlFor={`pesticide-${short}`}>{short}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="control-item">
                <label>Application Rate</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={coverageArea}
                    className="slider"
                    id="coverageArea"
                    onChange={(e) => setCoverageArea(e.target.value)}
                  />
                  <span className="value">{coverageArea}%</span>
                </div>
                <button className="control-btn" id="startPestControl">
                  <i className="fas fa-shield-alt"></i> Apply Treatment
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IrrigationContent;
