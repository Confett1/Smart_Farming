import FertilizerControl from "./FertilizerCtrl";
import IrrigationControl from "./IrrigationCtrl";
import PesticidesControl from "./PesticidesCtrl";

const IrrigationComponent = () => {
    return (
        <>
            <div className="page-name">
                <h2 className="text-left">Control Center</h2>
            </div>
            <div className="control-grid">
                <IrrigationControl />
                <FertilizerControl />
                <PesticidesControl />
            </div>
        </>
    );
};

export default IrrigationComponent;
