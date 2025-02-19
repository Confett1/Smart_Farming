// import { useEffect, useState } from 'react';
// import ControlCenter from '../../components/sections/Dashboard/control-center';
// import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
// import SystemStatus from '../../components/sections/Dashboard/system-status';
// import '../../styles/Homepage.css';

// const Dashboard = () => {
//   const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Simulate loading state for demonstration (e.g., data fetching)
//         const timer = setTimeout(() => setIsLoading(false), 1000); // Adjust as needed
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <>
//         <div className="layout">
//           <div className="content">
            
//             <main className="main-content">
//               <SystemStatus />
//               <RealTimeMonitor />
//               <ControlCenter />
//             </main>
//           </div>
//         </div>
      
//         <script src="Homepage.js"></script>      
//         </>
//     );
// };

// export default Dashboard;








import { useEffect, useState } from 'react';
import ControlCenter from '../../components/sections/Dashboard/control-center';
import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
import SystemStatus from '../../components/sections/Dashboard/system-status';
import PageLoader from '../../components/loader/LinearLoader';
import '../../styles/Homepage.css';
import Footer from '../../layout/main/footer';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="layout">
      <div className="content">
        <main className="main-content">
          <SystemStatus />
          <RealTimeMonitor />
          <ControlCenter />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
