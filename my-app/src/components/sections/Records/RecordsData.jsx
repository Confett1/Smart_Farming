import RecordTable from './Table';

const RecordsContent = () => {
    return (
        <>
            <RecordTable />
            <div className="table-container">
                <table className="records-table">
                    <thead>
                        <tr>
                            <th><i className="fas fa-calendar-alt"></i> Date</th>
                            <th><i className="fas fa-tasks"></i> Activity</th>
                            <th><i className="fas fa-info-circle"></i> Status</th>
                            <th><i className="fas fa-clock"></i> Duration</th>
                            <th><i className="fas fa-cog"></i> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2024-11-28</td>
                            <td>Irrigation</td>
                            <td><span className="status-badge completed">Completed</span></td>
                            <td>2 hours</td>
                            <td>
                                <button className="btn btn-icon" aria-label="Edit record">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2024-11-28</td>
                            <td>Fertilization</td>
                            <td><span className="status-badge in-progress">In Progress</span></td>
                            <td>1 hour</td>
                            <td>
                                <button className="btn btn-icon" aria-label="Edit record">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2024-11-27</td>
                            <td>Pest Control</td>
                            <td><span className="status-badge completed">Completed</span></td>
                            <td>3 hours</td>
                            <td>
                                <button className="btn btn-icon" aria-label="Edit record">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2024-11-27</td>
                            <td>Harvesting</td>
                            <td><span className="status-badge scheduled">Scheduled</span></td>
                            <td>4 hours</td>
                            <td>
                                <button className="btn btn-icon" aria-label="Edit record">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="btn btn-icon" title="Previous page">
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="page-numbers">
                    <button className="page-num active">1</button>
                    <button className="page-num">2</button>
                    <button className="page-num">3</button>
                    <span className="page-ellipsis">...</span>
                    <button className="page-num">5</button>
                </div>
                <button className="btn btn-icon" title="Next page">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </>
    );
};


export default RecordsContent;