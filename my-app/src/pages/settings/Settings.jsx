import { useEffect, useState } from 'react';
import '../../styles/Settings.css';
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import { Stack } from '@mui/material';
import SettingsComponent from '../../components/sections/Settings';

const Settings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
        <div className={`h-screen ${darkModePref? "" : "bg-gray-700"}`}>
            <Stack mx={2.7} my={1}>
                <Breadcrumb PageName={"Settings"} />
                <SettingsComponent />
            </Stack>
            <Footer />
        </div>
        </>
    );
};

export default Settings;    