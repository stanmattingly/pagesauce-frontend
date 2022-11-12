import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Api } from "../../Api";
import AddWebsiteForm from "../Forms/AddWebsiteForm";


function AddWebsiteDialog({newWebsiteDialogOpen, closeNewWebsiteDialog, setSelectedWebsite, newWebsiteName, setNewWebsiteName, newWebsiteUrl, setNewWebsiteUrl}) {

    function addNewWebsite() {
        const api = new Api();

        if (newWebsiteName && newWebsiteUrl) {
            api.createWebsite(newWebsiteName, newWebsiteUrl).then(website => {
                setSelectedWebsite(website.universal_id);
                closeNewWebsiteDialog();
            })
        }
    }

    return (
        <Dialog 
            open={newWebsiteDialogOpen} 
            fullWidth={true}
            maxWidth='sm'
        >
            <DialogTitle component="div">
                <Typography variant="h6">Add New Website</Typography>
                <Typography variant="subtitle1">Add a website to your account.</Typography>
            </DialogTitle>
            <DialogContent>
                <AddWebsiteForm setNewWebsiteName={setNewWebsiteName} setNewWebsiteUrl={setNewWebsiteUrl}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeNewWebsiteDialog}>Cancel</Button>
                <Button onClick={addNewWebsite}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddWebsiteDialog;