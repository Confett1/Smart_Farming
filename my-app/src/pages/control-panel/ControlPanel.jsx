import { useEffect, useState } from 'react';
import '../../styles/Water level.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import IrrigationComponent from '../../components/sections/ControlPanel';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WaterLevel = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (user.role !== 'admin') {
    navigate('/login');
  }

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