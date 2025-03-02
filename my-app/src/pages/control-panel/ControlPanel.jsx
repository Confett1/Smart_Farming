import { useEffect, useState } from 'react';
import '../../styles/Homepage.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import IrrigationComponent from '../../components/sections/ControlPanel';
import { Stack } from '@mui/material';

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
      <Stack mx={2.7} my={1}>
        <Breadcrumb PageName={"Control Panel"} />
        <IrrigationComponent />
      </Stack>
      <Footer />
    </>
  );
};

export default WaterLevel;