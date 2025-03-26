// import { useState, useEffect } from "react";

// const HarvestInput = ({ onSave }) => {
//     const [harvestInput, setHarvestInput] = useState("");
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (error) {
//             const timer = setTimeout(() => setError(""), 2000);
//             return () => clearTimeout(timer);
//         }
//     }, [error]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError("");

//         if (!harvestInput.trim()) {
//             setError("Please enter a value");
//             return;
//         }

//         const value = Number(harvestInput);
//         if (isNaN(value)) {
//             setError("Please enter a number");
//             return;
//         }
//         if (value <= 0) {
//             setError("Value must be > 0");
//             return;
//         }

//         fetch("http://localhost:8080/charts/harvest", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//                 type:"harvest",
//                 value: value, 
//                 timestamp: new Date().toISOString() 
//             }),
//         })
//         .then(response => {
//             if (!response.ok) throw new Error("Failed to save");
//             setHarvestInput("");
//             if (onSave) onSave();
//         })
//         .catch(error => {
//             console.error("Error saving harvest:", error);
//             setError("Failed to save");
//         });
//     };

//     return (
//         <div className={`harvest-input-container ${error ? "error-active" : ""}`}>
//             <div className="error-message">{error}</div>
//             <form onSubmit={handleSubmit} className="harvest-input-form">
//                 <input
//                     type="text"
//                     inputMode="numeric"
//                     value={harvestInput}
//                     onChange={(e) => setHarvestInput(e.target.value)}
//                     placeholder="Enter harvest (kg)"
//                     className="harvest-input"
//                 />
//                 <button type="submit" className="save-btn">
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default HarvestInput;

// HarvestInput.jsx
import { useState, useEffect } from "react";
import { toast } from "../../../utils/toast";

const HarvestInput = ({ onSave }) => {
    const [harvestInput, setHarvestInput] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // ✅ Added success message state

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(""); // ✅ Clear success message on new submission

        if (!harvestInput.trim()) {
            setError("Please enter a value");
            return;
        }

        const value = Number(harvestInput);
        if (isNaN(value)) {
            setError("Please enter a number");
            return;
        }
        if (value <= 0) {
            setError("Value must be > 0");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/charts/harvest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    type: "harvest",
                    value: value, 
                    timestamp: new Date().toISOString() 
                }),
            });
    
            if (!response.ok) throw new Error("Failed to save");
    
            setHarvestInput("");
            setSuccess("Data has been added successfully"); // ✅ Show success message
    
            const toastResponse = await toast("Data successfully recorded", "Harvest Record", "success");
            
            if (toastResponse.isConfirmed) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error saving harvest:", error);
            setError("Failed to save");
        }
    };

    return (
        <div className={`harvest-input-container ${error ? "error-active" : ""}`}>
            <div className="error-message">{error}</div>
            <div className="success-message">{success}</div> {/* ✅ Success message */}
            <form onSubmit={handleSubmit} className="harvest-input-form">
                <input
                    type="text"
                    inputMode="numeric"
                    value={harvestInput}
                    onChange={(e) => setHarvestInput(e.target.value)}
                    placeholder="Enter harvest (kg)"
                    className="harvest-input"
                />
                <button type="submit" className="save-btn">
                    Save
                </button>
            </form>
        </div>
    );
};

export default HarvestInput;
