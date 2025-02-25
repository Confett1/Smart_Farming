import { useEffect, useState } from 'react';
import '../../styles/Settings.css';
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import { Stack } from '@mui/material';
import SettingsComponent from '../../components/sections/Settings';
import useAuth from '../../hooks/useAuth';

const Settings = () => {
    const user = useAuth();
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
                <Breadcrumb PageName={"Settings"} />
                <SettingsComponent />
            </Stack>
            <Footer />
        </>
    );
};

export default Settings;    