import { Stack } from "@mui/material";
import Footer from "../../layout/main/footer";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import PageLoader from '../../components/loader/LinearLoader';
import Profile from "../../components/sections/ProfileSection";

const ProfilePage = () => {
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
            <Stack p={2.7}>
                <Breadcrumb PageName={"Profile"} />
                <Profile />
            </Stack>
            <Footer />
        </>
    )
}

export default ProfilePage;