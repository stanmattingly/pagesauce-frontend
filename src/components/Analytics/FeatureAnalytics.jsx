import { useEffect, useState } from "react";

function FeatureAnalytics({group, token}) {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/features/?group_name=${group.name}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setFeatures(data);
            })
    }, [])

    return (
        <>
            <h3>{group.name}</h3>
            <div className="GroupAnalytics">
                {features.map(feature => <p>{feature.slot.order} - {feature.description} - {feature.hotness}</p>)}
            </div>
        </>
    )
}

export default FeatureAnalytics;