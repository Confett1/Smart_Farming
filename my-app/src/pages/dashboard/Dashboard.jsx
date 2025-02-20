import { useEffect, useState } from 'react';
import ControlCenter from '../../components/sections/Dashboard/control-center';
import SystemStatus from '../../components/sections/Dashboard/system-status';
import PageLoader from '../../components/loader/LinearLoader';
import '../../styles/Homepage.css';
import Footer from '../../layout/main/footer';
import RealTimeMonitor from '../../components/sections/Dashboard/realtime-monitor';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
import { Stack } from '@mui/material';

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
        <Stack
          sx={{
            px: 4
          }}
        >
          <Breadcrumb />
          <SnackbarComponent />
          <SystemStatus />
          <RealTimeMonitor />
          <ControlCenter />
        </Stack>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
