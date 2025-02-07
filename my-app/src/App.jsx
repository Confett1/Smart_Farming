import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className="section-title">System Status</h2>
      <div className="status-grid">
        <div className="status-card">
          <div className="status-icon irrigation-status">
            <i className="fas fa-tint"></i>
          </div>
          <div className="status-info">
            <h3>Irrigation System</h3>
            <span className="status active">Active</span>
            <div className="status-details">
              <span>Water Flow: 2.5 L/min</span>
              <span>Next Schedule: 2h</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default App;
