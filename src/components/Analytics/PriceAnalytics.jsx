import { useEffect, useState } from "react";

function PriceAnalytics({group, token}) {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/prices/?group_name=${group.name}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setPrices(data);
            })
    }, [])
    return (
        <>
            <h3>{group.name}</h3>
            <div className="GroupAnalytics">
                {prices.map(price => <p>{price.price} - {price.hotness}</p>)}
            </div>
        </>
    )
}

export default PriceAnalytics;