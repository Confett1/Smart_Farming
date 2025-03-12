import { useEffect, useState } from "react"
import PageLoader from "../../components/loader/PageLoader";
import { Stack } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import EditProfile from "../../components/sections/ProfileSection/EditProfile";

const ProfileEditPage = () => {
    const [isLoading, setIsLoading] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if(isLoading) {
        <PageLoader />
    }

    return (
        <>
            <div className={`${darkModePref? "" : "bg-gray-700"}`}>
                <Stack p={2.7}>
                    <Breadcrumb PageName={"Edit Profile"}/>
                    <EditProfile user={user} />
                </Stack>
            </div>
        </>
    );
}

export default ProfileEditPage;