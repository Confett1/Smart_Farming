import PropTypes from "prop-types";
import RecordsContent from "./Table";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useState } from "react";

const RecordsComponent = ({ openModal }) => {
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    const [filterType, setFilterType] = useState("all");
    const [filterDropdown, setOpenFilterDropdown] = useState(false);

    const filterRecords = (type) => {
        setFilterType(type);
        setOpenFilterDropdown(false);
    }

    return (
        <>
            <div className="records-header">
                <div className={`page-name ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>
                    <h2>Activity Records</h2>
                </div>
                <div className="records-actions">
                    <Button
                        onClick={openModal}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        color="success"
                        startIcon={<Plus />}
                    >
                        Add New Record
                        {/* <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        /> */}
                    </Button>
                    <div className="filter-dropdown">
                        <button onMouseEnter={() => setOpenFilterDropdown(true)}  className={`${darkModePref ? "text-gray-800" : "text-gray-200"}`}>
                            <i className="fas fa-filter px-1"></i>
                                Filter By
                            <i className="fas fa-chevron-down px-1"></i>
                        </button>

                        <div onMouseLeave={() => setOpenFilterDropdown(false)} className={`dropdown-content  ${filterDropdown ? "block" : "hidden"}`}>
                            <button onClick={() => filterRecords("all")} className={`px-4 py-2 hover:bg-gray-400 w-full cursor-pointer bg-transparent `}><i className="fas fa-list"></i> All Records</button>
                            <button onClick={() => filterRecords("completed")} className="px-4 py-2 hover:bg-gray-400 w-full cursor-pointer bg-transparent"><i className="fas fa-check-circle"></i> Completed</button>
                            <button onClick={() => filterRecords("in progress")} className="px-4 py-2 hover:bg-gray-400 w-full cursor-pointer bg-transparent"><i className="fas fa-clock"></i> In Progress</button>
                            <button onClick={() => filterRecords("pending")} className="px-4 py-2 hover:bg-gray-400 w-full cursor-pointer bg-transparent"><i className="fas fa-calendar"></i> Scheduled</button>
                        </div>
                    </div>
                </div>
            </div>

            <RecordsContent filterType={filterType  } darkModePref={darkModePref} />
        </>
    );
};

RecordsComponent.propTypes = {
    openModal: PropTypes.func.isRequired
}

export default RecordsComponent;