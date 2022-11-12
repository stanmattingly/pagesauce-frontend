import PriceFeature from './PriceFeature';
import CheckoutButton from './CheckoutButton';
import { ACTIONS } from '../../utils/Actions';

import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';

function PricingItem({ group, selectedGroup, setSelectedGroup, userId, token }) {
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [features, setFeatures] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

    const animateSelected = useSpring({
        boxShadow: isHovering ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "rgba(60, 64, 67, 0) 0px 1px 2px 0px, rgba(60, 64, 67, 0) 0px 2px 6px 2px",
    });

    function handleItemClick(group) {
        if (selectedGroup && selectedGroup !== group) {
            console.log(selectedGroup.name);
            fetch(`http://localhost:8000/api/analytic-records/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'user_id': userId,
                    'group_id': selectedGroup.id,
                    'action_string': ACTIONS.UNSELECT,
                })
            });
        }
        setSelectedGroup(group);
        fetch(`http://localhost:8000/api/analytic-records/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'user_id': userId,
                'group_id': group.id,
                'action_string': ACTIONS.SELECT,
            })
        });
    }

    function handleItemHover() {
        setIsHovering(true);
        fetch(`http://localhost:8000/api/analytic-records/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'user_id': userId,
                'group_id': group.id,
                'action_string': ACTIONS.HOVER,
            })
        });
    }

    function handleItemLeave() {
        setIsHovering(false);
        fetch(`http://localhost:8000/api/analytic-records/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'user_id': userId,
                'group_id': group.id,
                'action_string': ACTIONS.LEAVE,
            })
        });
    }

    useEffect(() => {
        if (userId && group) {
            fetch(`http://localhost:8000/api/prices/get_group_price/?group_id=${group.id}&user_id=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPrice(data);
                });
            fetch(`http://localhost:8000/api/price-group-descriptions/get_group_description/?group_id=${group.id}&user_id=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    setDescription(data);
                });
            fetch(`http://localhost:8000/api/features/get_group_features/?group_id=${group.id}&user_id=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    setFeatures(data);
                });
        }
    }, [group, userId]);

    return (price && description && features) ? (
        <animated.div className={`PricingItem${selectedGroup === group ? ' PricingItem--selected' : ''}`} onClick={() => handleItemClick(group)} onMouseEnter={handleItemHover} onMouseLeave={handleItemLeave} style={animateSelected}>
            <div className="PricingItem__name">{group.name}</div>
            <div className="PricingItem__price">{price.price}</div>
            <div className="PricingItem__description">{description ? description.description : ''}</div>
            {features.length > 0 ? features.map((feature, key) => <PriceFeature description={feature.description} key={key} />) : ''}
            <CheckoutButton group={group} userId={userId} text="Sign Up" actionClick={ACTIONS.SIGNUP_CLICK} actionHover={ACTIONS.SIGNUP_HOVER} actionLeave={ACTIONS.SIGNUP_LEAVE} token={token}/>
            <CheckoutButton group={group} userId={userId} text="Convert" actionClick={ACTIONS.CONVERSION_CLICK} actionHover={ACTIONS.CONVERSION_HOVER} actionLeave={ACTIONS.CONVERSION_LEAVE} token={token}/>
        </animated.div>
    ) : <h1>Loading...</h1>
}

export default PricingItem;