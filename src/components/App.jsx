import '../scss/App.scss';
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import { Container } from "@mui/material"

import Dashboard from "./Dashboard/Dashboard";
import Navigation from "./Navigation/Navigation";
import AuthNavigation from './Navigation/AuthNavigation';
import Register from './Auth/Register';
import Login from './Auth/Login';
import AddWebsiteDialog from './Dialogs/AddWebsiteDialog';

function App() {
    const [signedIn, setSignedIn] = useState(localStorage.getItem("refresh-token") !== "null");
    const [selectedWebsite, setSelectedWebsite] = useState(localStorage.getItem("selected-website") ? localStorage.getItem("selected-website") : '');

    const [newWebsiteName, setNewWebsiteName] = useState('');
    const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
    const [newWebsiteDialogOpen, setNewWebsiteDialogOpen] = useState(false);

    function closeNewWebsiteDialog() {
        setNewWebsiteDialogOpen(false);
    }

    function openNewWebsiteDialog() {
        setNewWebsiteDialogOpen(true);
    }

    useEffect(() => {
        if (selectedWebsite) {
            localStorage.setItem("selected-website", selectedWebsite);
        }
    }, [selectedWebsite])

    return (
        <Router>
            <AuthNavigation 
                selectedWebsite={selectedWebsite} 
                setSelectedWebsite={setSelectedWebsite} 
                openNewWebsiteDialog={openNewWebsiteDialog} 
                signedIn={signedIn} 
                setSignedIn={setSignedIn}
            />
            <Container maxWidth="lg">
                <Routes>
                    {signedIn ? (
                        <Route path="/" element={<Dashboard selectedWebsite={selectedWebsite}/>}/>
                    ) : <Route path="/" element={<Login />}/>}
                    <Route path="/dashboard" element={<Dashboard selectedWebsite={selectedWebsite}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                <AddWebsiteDialog 
                    newWebsiteDialogOpen={newWebsiteDialogOpen} 
                    closeNewWebsiteDialog={closeNewWebsiteDialog}
                    setSelectedWebsite={setSelectedWebsite}
                    newWebsiteName={newWebsiteName}
                    setNewWebsiteName={setNewWebsiteName}
                    newWebsiteUrl={newWebsiteUrl}
                    setNewWebsiteUrl={setNewWebsiteUrl}
                />
            </Container>
        </Router>
    )
}

export default App;