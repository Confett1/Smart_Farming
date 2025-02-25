import { useEffect, useState } from 'react';
import '../../styles/Chart.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import { Stack } from '@mui/material';
import ChartsComponent from '../../components/sections/Charts';
import useAuth from '../../hooks/useAuth';

const Chart = () => {
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
                <Breadcrumb PageName={"Chart"} />
                <ChartsComponent />
            </Stack>
            <Footer />
        </>
    );
}

export default Chart;