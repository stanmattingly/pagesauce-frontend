import PricingItem from "./PricingItem";

function PricingContainer({userId, groups, selectedGroup, setSelectedGroup, token}) {
    return (
        <div>
            <div className="PricingContainer">
                {groups.map(group => <PricingItem 
                                        group={group} 
                                        selectedGroup={selectedGroup} 
                                        setSelectedGroup={setSelectedGroup} 
                                        userId={userId} 
                                        key={group.id}
                                        token={token}
                                    />
                )}
            </div>
        </div>
    )
}

export default PricingContainer;