import { FaCheckCircle } from "react-icons/fa";

function PriceFeature({description}) {
    return (
        <div className="PriceFeature">
            <div className="PriceFeature__icon">
                <FaCheckCircle/>
            </div>
            <div className="PriceFeature__description">{description}</div>
        </div>
    )
}

export default PriceFeature;