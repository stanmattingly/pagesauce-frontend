import PricingContainer from "./PricingContainer";
import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Pricing({ api, selectedAccountId }) {
  const cookieUserId = cookies.get('userId');
  const [userId, setUserId] = useState(cookieUserId);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const accessToken = api.accessToken;

  useEffect(() => {
    if (accessToken) {
      fetch('http://localhost:8000/api/analytics-users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          'user_id': cookieUserId,
        })
      })
        .then(response => response.json())
        .then(data => {
          cookies.set('userId', data.analytics_user_id, { path: '/'});
          setUserId(data.analytics_user_id);
      }) 
      if (userId) {
        if (groups.length === 0) {
          fetch(`http://localhost:8000/api/price-groups/?account_id=${selectedAccountId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
          })
            .then(response => response.json())
            .then(data => {
                setGroups(data.results);
          })
        }
      }
    }
  }, []);

  return (
    <div>
      <h1>Plans</h1> 
      <PricingContainer 
        userId={userId} 
        groups={groups} 
        selectedGroup={selectedGroup} 
        setSelectedGroup={setSelectedGroup}
        token={accessToken}
      />
    </div>
  );
}

export default Pricing;
