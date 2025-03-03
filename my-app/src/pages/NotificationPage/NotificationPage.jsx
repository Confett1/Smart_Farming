import { Stack } from "@mui/material";
import Notifications from "../../components/sections/NotificationList"
import Footer from "../../layout/main/footer";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import PageLoader from '../../components/loader/LinearLoader';

const NotificationPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const profile = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
    
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }, []);

    if (isLoading) {
        return <PageLoader />;
      }
    
    return (
        <>
            <Stack p={2.7}>
                <Breadcrumb PageName={"Notification"} />
                <Notifications profile={profile} />
            </Stack>
            <Footer />
        </>
    )
}

export default NotificationPage;