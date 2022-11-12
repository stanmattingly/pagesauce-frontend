import {
    Box,
    Button,
    Container,
    Typography,
    Stack,
} from "@mui/material"

import {
    Link
} from "react-router-dom";

import './scss/Navigation.scss';

import WebsiteSelector from "./WebsiteSelector";
import { Api } from "../../Api";

function AuthNavigation({selectedWebsite, setSelectedWebsite, openNewWebsiteDialog, signedIn, setSignedIn}) {

    function handleSignOut() {
        localStorage.setItem("refresh-token", null);
        setSignedIn(false);
    }

    const api = new Api();

    function handleIntegrateClick() {
        api.getSmartAddToken(selectedWebsite).then(token => {
            window.open(token.url_build, '_blank');
        });
    }

    return (
        <Box sx={{ borderBottom: "2px solid #D3D3D3", marginBottom: "20px", padding: "10px 0"}}>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography className="Logo">PAGESAUCE.IO</Typography>
                    </Link>

                    {signedIn &&
                        <Stack direction="row" gap={5}>
                            <Button>Dashboard</Button>
                            <Button onClick={handleIntegrateClick}>Add Smart Elements</Button>
                            <Button>Settings</Button>
                            <Button onClick={handleSignOut}>Sign Out</Button>
                        </Stack>
                    }

                    {signedIn && <WebsiteSelector 
                        selectedWebsite={selectedWebsite} 
                        setSelectedWebsite={setSelectedWebsite} 
                        openNewWebsiteDialog={openNewWebsiteDialog}
                    />}

                    {!signedIn && (
                        <Link to="/login">
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </Stack>
            </Container>
        </Box>
    )
}

export default AuthNavigation;