import { useEffect, useState } from "react";
import GroupPriceCard from "./GroupPriceCard";

function TopPrices({api, selectedAccountId}) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        api.getGroups(selectedAccountId).then(groups => setGroups(groups.filter(group => group.prices.length > 0)));
    }, [selectedAccountId]);

    return (
        <div className="DashboardCard">
            {groups.map(group => (
                <GroupPriceCard key={group.id} group={group}/>
            ))}
        </div>
    )
}

export default TopPrices;