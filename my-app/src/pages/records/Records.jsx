import { useEffect, useState } from 'react';
import '../../styles/Records.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Modal from '../../components/modals';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import { Stack } from '@mui/material';
import RecordsComponent from '../../components/sections/Records';
import useAuth from '../../hooks/useAuth';

const Records = () => {
    const user = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
        console.log("Opening Modal");
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Record">
                <p>This is the modal content.</p>
            </Modal>

            <Stack mx={2.7} my={1}>
                <Breadcrumb PageName={"Records"} />

                <RecordsComponent openModal={openModal} />
            </Stack>
            <Footer />
        </>
    );
}

export default Records;