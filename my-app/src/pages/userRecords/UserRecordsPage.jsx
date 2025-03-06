import { Stack } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs/Breadcrumb";
import UserRecords from "../../components/sections/UserRecords";
import Footer from "../../layout/main/footer";
import { useEffect, useState } from "react";
import LinearLoader from "../../components/loader/LinearLoader";

const UserRecordsPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [])

    if (isLoading) {
        return <LinearLoader />;
    }
    return (
        <>
            <Stack mx={2.7} my={1}>
                <Breadcrumb PageName={"User Records"}/>
                <UserRecords />
            </Stack>
            <Footer />
        </>
    );
};

export default UserRecordsPage;