import './scss/GroupPriceCard.scss';
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ExpandableTable from "./ExpandableTable";


function GroupPriceCard({group}) {
    const [term, setTerm] = useState("mo")
    const monthlyPrices = group.prices.filter(group => group.term === 'mo');
    const annualPrices = group.prices.filter(group => group.term === 'yr');

    const [prices, setPrices] = useState(monthlyPrices);

    const handleChangeTerm = (event) => {
        setTerm(event.target.dataset.term);
    };

    useEffect(() => {
        setPrices(term === "mo" ? monthlyPrices : term === "yr" ? annualPrices : group.prices);
    }, [term]);

    useEffect(() => {
        console.log(prices)
    }, [prices])

    return (
        <div className="GroupPriceCard">
            <div className="DashboardCard__header">
                <h3>Top {group.name} Prices</h3>
                <ButtonGroup variant="outlined" size="small" aria-label="outlined primary small button group">
                    <Button onClick={handleChangeTerm} data-term="mo" variant={term === 'mo' ? "contained" : "outlined"}>Monthly</Button>
                    <Button onClick={handleChangeTerm} data-term="yr" variant={term === 'yr' ? "contained" : "outlined"}>Annual</Button>
                    <Button onClick={handleChangeTerm} data-term="" variant={term === '' ? "contained" : "outlined"}>All</Button>
                </ButtonGroup>
            </div>
            <ExpandableTable data={prices} titles={["💰 Price", "🔥 Heat Score", "🎉 Conversions"]} fields={[{key: "price", prefix: "$", suffix: "/", suffixField: "term"}, {key: "normalized_hotness", prefix: ""}, {key: "interaction_count", prefix: ""}]} showRowCount={true} rowCountConfig={{title: "💯 Rank", prefix: "#"}} numInitVisible={2}/>
        </div>
    )
}

export default GroupPriceCard