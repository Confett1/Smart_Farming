import PropTypes from "prop-types";
import RecordsContent from "./Table";

const RecordsComponent = ({ openModal }) => {
    return (
        <>
            <div className="records-header">
                <div className="page-name">
                    <h2>Activity Records</h2>
                </div>
                <div className="records-actions">
                    <button className="btn btn-primary" style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={openModal}>
                        <i className="fas fa-plus"></i> Add New Record
                    </button>
                    <div className="filter-dropdown">
                        <button className="btn btn-secondary">
                            <i className="fas fa-filter"></i> Filter By
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#" className="active"><i className="fas fa-list"></i> All Records</a>
                            <a href="#"><i className="fas fa-check-circle"></i> Completed</a>
                            <a href="#"><i className="fas fa-clock"></i> In Progress</a>
                            <a href="#"><i className="fas fa-calendar"></i> Scheduled</a>
                        </div>
                    </div>
                </div>
            </div>

            <RecordsContent />
        </>
    );
};

RecordsComponent.propTypes = {
    openModal: PropTypes.bool.isRequired
}

export default RecordsComponent;