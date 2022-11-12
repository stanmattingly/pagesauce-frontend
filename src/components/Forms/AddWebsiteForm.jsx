import {
    TextField,
} from "@mui/material";
import { Api } from "../../Api";


function AddWebsiteForm({setNewWebsiteName, setNewWebsiteUrl}) {
    const api = new Api();

    function handleWebsiteNameChange(event) {
        setNewWebsiteName(event.target.value)
    }

    function handleWebsiteUrlChange(event) {
        setNewWebsiteUrl(event.target.value)
    }

    return (
        <div>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Website Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleWebsiteNameChange}
            />
            <TextField
                margin="dense"
                id="name"
                label="Website URL"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleWebsiteUrlChange}
            />
        </div>
    )
}

export default AddWebsiteForm;