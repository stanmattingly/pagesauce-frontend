import { useEffect, useState } from "react";

function DescAnalytics({group, token}) {
    const [descs, setDescs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/price-group-descriptions/?group_name=${group.name}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setDescs(data);
            })
    }, [])

    return (
        <>
            <h3>{group.name}</h3>
            <div className="GroupAnalytics">
                {descs.map(desc => <p>{desc.description} - {desc.hotness}</p>)}
            </div>
        </>
    )

}

export default DescAnalytics;