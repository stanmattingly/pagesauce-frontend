import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

const pricingTable = document.getElementById('smart-pricing-table');
const root = ReactDOM.createRoot(pricingTable);

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        return pushState.apply(history, arguments);
    };
})(window.history);

root.render(<App/>);
