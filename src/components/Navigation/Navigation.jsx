import { Button, Stack, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useState } from 'react';
import {
    Link
} from "react-router-dom";
import { Api } from '../../Api';

import './scss/Navigation.scss';

import WebsiteSelector from './WebsiteSelector';

function Navigation({ signedIn, selectedWebsite, setSelectedWebsite, openNewWebsiteDialog }) {

    function handleIntegrateClick() {
        const api = new Api();

        api.getSmartAddToken(selectedWebsite).then(token => {
            window.open(token.url_build, '_blank');
        });
    }

    return (
        <div className='Navigation'>
            <img className="Navigation__brand" src="https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=360"/>
            { signedIn ? (
                <div className="Navigation__buttons">
                    <Link to='/' className='Navigation__link'>
                        <Button variant="text">Dashboard</Button>
                    </Link>
                    <Link to='/dashboard' className='Navigation__link'>
                        <Button variant="text">Dashboard</Button>
                    </Link>
                    <Link to='/' className='Navigation__link'>
                        <Button variant="text">Content</Button>
                    </Link>
                    <Button onClick={handleIntegrateClick} variant="text">Integrate</Button>
                </div>
            ) : (
                <div className="Navigation__buttons">
                    <Link to='/' className='Navigation__link'>
                        <Button variant="text">How it Works</Button>
                    </Link>
                    <Link to='/' className='Navigation__link'>
                        <Button variant="text">Success Cases</Button>
                    </Link>
                    <Link to='/' className='Navigation__link'>
                        <Button variant="text">Pricing</Button>
                    </Link>
                    <Link to='/table' className='Navigation__link'>
                        <Button variant="text">Documentation</Button>
                    </Link>
                </div>
            )}
            {signedIn ? 
                (
                    <WebsiteSelector selectedWebsite={selectedWebsite} setSelectedWebsite={setSelectedWebsite} openNewWebsiteDialog={openNewWebsiteDialog} />
                ) : 
                (
                    <Stack direction="row" spacing={2}>
                        <Link to="/register" className='Navigation__link'>
                            <Button variant="contained" color="secondary">Sign Up</Button>
                        </Link>
                        <Button>Sign In</Button>
                    </Stack>
                )
            }
        </div>
    )
}

export default Navigation;