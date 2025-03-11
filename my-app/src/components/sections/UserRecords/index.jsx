import UsersRecordTable from "./UserRecords";

const UserRecords = () => {
    const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
    return (
        <>
        <div className="records-header">
            <div className={`page-name ${darkModePref ? "text-[#2c3e50]" : "text-gray-200"}`}>                    
                <h2 >User Records</h2>
            </div>
        </div>
        
        <UsersRecordTable />
        </>
    );
};

export default UserRecords;