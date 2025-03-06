import { useEffect, useState } from 'react';
import '../../styles/Records.css'
import PageLoader from '../../components/loader/LinearLoader';
import Footer from '../../layout/main/footer';
import Modal from '../../components/modals';
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb';
import { Stack } from '@mui/material';
import RecordsComponent from '../../components/sections/Records';
import API from '../../api/api';
import { toast } from '../../utils/toast';
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Records = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordDetails, setRecordDetails] = useState({
        activityName: "",
        duration: "",
        status: "",
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
  
    if (user.role !== 'admin') {
      navigate('/login');
    }

    const addRecord = async () => {
        try {
            const response = await API.post("/records/add", recordDetails);
            setRecordDetails({
                activityName: "",
                duration: "",
                status: "",
            })

            toast(response.data, "Added New Record", "success");
        } catch (error) {
            console.error("Error adding record: ", error);

            toast("Failed to add new record", "", "error");
        }
        closeModal();
    };

    const handleChange = (e) => {
        setRecordDetails({
            ...recordDetails,
            [e.target.name]: e.target.value,
        });
    };

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
            <Modal isOpen={isModalOpen} onClose={closeModal} onSave={addRecord} title="Add New Record">
                <form>
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        name='activityName'
                        value={recordDetails.activityName}
                        label="Activity Name"
                        id="fullWidth"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "green", // Border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "green", // Border color when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray", 
                                "&.Mui-focused": {
                                    color: "green", // Label color when focused
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "green", // Optional: Change the input text color when focused
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        onChange={handleChange}
                        value={recordDetails.duration}
                        name='duration'
                        label="Duration"
                        id="fullWidth"
                        sx={{
                            my: 1.6,
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "green", // Border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "green", // Border color when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray", 
                                "&.Mui-focused": {
                                    color: "green", // Label color when focused
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "green", // Optional: Change the input text color when focused
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        onChange={handleChange}
                        value={recordDetails.status}
                        name='status'
                        label="Status"
                        id="fullWidth"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "green", // Border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "green", // Border color when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray", 
                                "&.Mui-focused": {
                                    color: "green", // Label color when focused
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "green", // Optional: Change the input text color when focused
                            },
                        }}
                    />
                    {/* <input
                        type="text"
                        placeholder="Activity Name"
                        name="activityName"
                        onChange={handleChange}
                        value={recordDetails.activityName}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Duration"
                        name="duration"
                        onChange={handleChange}
                        value={recordDetails.duration}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        name="status"
                        onChange={handleChange}
                        value={recordDetails.status}
                        className="w-full p-2 mb-2 border rounded"
                    /> */}
                </form>
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