import { useEffect, useState } from 'react';
// import SystemStatus from '../../components/sections/Dashboard/system-status';
import PageLoader from '../../components/loader/LinearLoader';
import '../../styles/Homepage.css';
import Footer from '../../layout/main/footer';
import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
import { Stack } from '@mui/material';
import { signedIn } from '../../utils/toast';

const Dashboard = () => {  
  // const user = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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
      <Stack p={2.7}>
        {/* <SystemStatus /> */}
        <RealTimeMonitor />
      </Stack>
      <Footer />
    </>
  );
};

export default Dashboard;
