import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => {
                setShow(false);
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("modal")) {
            onClose();
        }
    };

    return (
        <>
            {/* Modal Backdrop with fade effect */}
            <div
                className={`modal fade ${show ? "show" : ""}`}
                id="exampleModalLong"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden={!isOpen}
                style={{ display: isOpen ? "block" : "none" }}
                onClick={handleBackdropClick}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {isOpen && <div className="modal-backdrop fade show" />}
        </>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
