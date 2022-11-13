import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { Api } from '../../Api';


function WebsiteSelector({ selectedWebsite, setSelectedWebsite, openNewWebsiteDialog }) {
    const [websites, setWebsites] = useState([]);
    const api = new Api()

    useEffect(() => {
        api.getWebsites().then(websites => setWebsites(websites));
    }, [])

    useEffect(() => {
        if (websites.length > 0) {
            if (websites.filter(website => website.universal_id === selectedWebsite).length <= 0) {
                setSelectedWebsite(websites[0].universal_id);
            }
        }
    }, [websites])

    const handleWebsiteChange = (event) => {
        const value = event.target.value;
        if (value === 'add') {
            return
        } else {
            setSelectedWebsite(event.target.value);
        }
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Website</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectedWebsite}
                label="Website"
                onChange={handleWebsiteChange}
            >
                {websites.map((website, key) => <MenuItem value={website.universal_id} key={key}>{website.name}</MenuItem>)}
                <MenuItem value="add" onClick={openNewWebsiteDialog}>+ New Website</MenuItem>
            </Select>
        </FormControl>
    )
}

export default WebsiteSelector;