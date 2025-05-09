import { useEffect, useState } from 'react';
// import SystemStatus from '../../components/sections/Dashboard/system-status';
import PageLoader from '../../components/loader/LinearLoader';
import '../../styles/Homepage.css';
import Footer from '../../layout/main/footer';
import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
import { Stack } from '@mui/material';
import { signedIn } from '../../utils/toast';
import SystemStatus from '../../components/sections/Dashboard/system-status';

const Dashboard = () => { 
  const [isLoading, setIsLoading] = useState(true);
  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));

  useEffect(() => {
    signedIn();

    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
    
      <div className={`${darkModePref? "" : "bg-gray-700"}`}>
  
        <Stack p={2.7}>
          <div className={`page-name my-2 ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>
              <h2>Dashboard</h2>
          </div> 
          <SystemStatus darkModePref={darkModePref} />
          <RealTimeMonitor />
        </Stack>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
