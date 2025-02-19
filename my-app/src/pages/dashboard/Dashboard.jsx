import ControlCenter from '../../components/sections/Dashboard/control-center';
import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
import SystemStatus from '../../components/sections/Dashboard/system-status';
import '../../styles/Homepage.css';

const Dashboard = () => {
    return (
        <>
        <div className="layout">
          <div className="content">
            
            <main className="main-content">
              <SystemStatus />
              <RealTimeMonitor />
              <ControlCenter />
            </main>
          </div>
        </div>
      
        <script src="Homepage.js"></script>      
        </>
    );
};

export default Dashboard;