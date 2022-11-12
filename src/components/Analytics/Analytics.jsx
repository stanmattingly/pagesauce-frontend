import '../../scss/Analytics.scss';

import { useEffect, useState } from "react";
import PriceAnalytics from "./PriceAnalytics";
import DescAnalytics from './DescAnalytics';
import FeatureAnalytics from './FeatureAnalytics';

function Analytics({ token }) {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/price-groups/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setGroups(data);
            })
    }, [])

    return (
        <div className="Analytics">
            <h1>Analytics</h1>
            <div className="Analytics__columns">
                <div className="Analytics__column">
                    <h2>Prices</h2>
                    {groups.map(group => <PriceAnalytics group={group} token={token}/>)}
                </div>
                <div className="Analytics__column">
                    <h2>Descriptions</h2>
                    {groups.map(group => <DescAnalytics group={group} token={token}/>)}
                </div>
                <div className="Analytics__column">
                    <h2>Features</h2>
                    {groups.map(group => <FeatureAnalytics group={group} token={token}/>)}
                </div>
            </div>
        </div>
    )
}

export default Analytics;