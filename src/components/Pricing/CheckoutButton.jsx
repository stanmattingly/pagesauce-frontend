import { useSpring, animated } from 'react-spring';
import { useState } from 'react';

function CheckoutButton({ group, userId, text, actionClick, actionHover, actionLeave, token }) {

    const [isHovering, setIsHovering] = useState(false);

    const shadowStyles = useSpring({ 
        boxShadow: isHovering ? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" : "rgba(0, 0, 0, 0) 0px 10px 20px, rgba(0, 0, 0, 0) 0px 6px 6px",
    });

    function handleMouseEnter(e) {
        e.stopPropagation();
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
                'action_string': actionHover,
            })
        });
    }

    function handleMouseLeave() {
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
                'action_string': actionLeave,
            })
        });
    }

    function handleClick(e) {
        e.stopPropagation();
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
                'action_string': actionClick,
            })
        });
    }

    return (
        <div>
            <animated.button className="CheckoutButton" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={shadowStyles} onClick={handleClick}>{text}</animated.button>
        </div>
    )
}

export default CheckoutButton;