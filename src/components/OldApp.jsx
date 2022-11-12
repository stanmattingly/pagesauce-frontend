import '../scss/App.scss';
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Pricing from './Pricing/Pricing';
import Navigation from "./Navigation/Navigation";
import { Api } from "../Api";
import Register from './Auth/Register';

function App() {
    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    const storedStripeAccountId = localStorage.getItem("selected-account-id");
    const queryParams = new URLSearchParams(window.location.search);
    const stripeAuthCode = queryParams.get("code");
    const [api, setApi] = useState(null);
    const [selectedAccountId, setSelectedAccountId] = useState(storedStripeAccountId);
    const [signedIn, setSignedIn] = useState(refreshToken !== null);

    useEffect(() => {
        const apiObject = new Api({
            "url": "http://localhost:8000/api",
            "accessToken": accessToken,
            "refreshToken": refreshToken,
            "stripeAuthCode": stripeAuthCode,
        })

        if (!accessToken || !refreshToken) {
            // TODO: Here is where we will prompt login
            // apiObject.setup("stanmattingly", "0927080927spM!").then(() => setApi(apiObject))
        } else {
            if (stripeAuthCode) {
                apiObject.addAccount(stripeAuthCode)
                .then(account => {
                    apiObject.setUser().then(() => setApi(apiObject));
                    setSelectedAccountId(account.account_id);
                })
            } else {
                apiObject.setUser().then(() => setApi(apiObject));
            }
        }
    }, [])

    useEffect(() => {
        if(api !== null && !storedStripeAccountId) {
            const accounts = api.getUser().stripe_accounts;
            if (accounts.length > 0) {
                setSelectedAccountId(accounts[0].account_id);
                localStorage.setItem('selected-account-id', accounts[0].account_id)
            }
        }
    }, [api])

    useEffect(() => {
        if (selectedAccountId) {
            localStorage.setItem('selected-account-id', selectedAccountId)
        }
    }, [selectedAccountId])

    return signedIn && api ? (
        <Router>
            <Navigation api={api} selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId}/>
            <Register/>
            <Routes>
                <Route path="/" element={<Dashboard api={api} selectedAccountId={selectedAccountId}/>}/>
                <Route path="/table" element={<Pricing api={api} selectedAccountId={selectedAccountId}/>}/>
            </Routes>
        </Router>
    ) : <Register/>
}

export default App;