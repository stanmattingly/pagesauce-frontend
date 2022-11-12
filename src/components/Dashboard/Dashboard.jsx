import { Grid, Button, Paper } from "@mui/material"

import {
    AddCircle,
} from '@mui/icons-material'

import ComponentAnalytics from "../Analytics/ComponentAnalytics";
import VerifyWebsite from "../Onboarding/VerifyWebsite";
import { useEffect, useState } from "react";
import { Api } from "../../Api";
import Login from "../Auth/Login";
import Onboarding from "../Onboarding/Onboarding";

function Dashboard({ selectedWebsite }) {
    const [components, setComponents] = useState([]);
    const [verified, setVerified] = useState(false)
    const api = new Api();

    function handleIntegrateClick() {
        api.getSmartAddToken(selectedWebsite).then(token => {
            window.open(token.url_build, '_blank');
        });
    }

    useEffect(() => {
        api.getComponents(selectedWebsite).then(results => setComponents(results))
    }, [selectedWebsite])

     return (
        <Grid container>
            <Grid item xs={12} sm={6} md={6}>
                <Onboarding selectedWebsite={selectedWebsite} verified={verified} setVerified={setVerified} components={components} setComponents={setComponents}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Grid container spacing={2}>
                    {components.map((component, key) => (
                        <Grid item xs={12} sm={12} md={12} key={key}>
                            <ComponentAnalytics component={component}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard;