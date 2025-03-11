import { Stack } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import UserRecords from "../../components/sections/UserRecords";
import Footer from "../../layout/main/footer";
import { useEffect, useState } from "react";
import LinearLoader from "../../components/loader/LinearLoader";
import { useNavigate } from "react-router-dom";

const UserRecordsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
  
    if (user.role !== 'admin') {
      navigate('/login');
    }

    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [])

    if (isLoading) {
        return <LinearLoader />;
    }
    return (
        <>
        <div className={`h-screen ${darkModePref? "" : "bg-gray-700"}`}>
            <Stack mx={2.7} my={1}>
                <Breadcrumb PageName={"User Records"}/>
                <UserRecords />
            </Stack>
            <Footer />
        </div>
        </>
    );
};

export default UserRecordsPage;