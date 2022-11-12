import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AddContentForm from "../Forms/AddContentForm";


function AddContentDialog({open, closeAddContentDialog, component, contents, setContents}) {
    return (
        <Dialog 
            open={open} 
            fullWidth={true}
            maxWidth='sm'
        >
            <DialogTitle component="div">
                <Typography variant="h6">Edit Content</Typography>
                <Typography variant="subtitle1">{component.name}</Typography>
            </DialogTitle>
            <DialogContent>
                <AddContentForm component={component} contents={contents} setContents={setContents}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddContentDialog}>Cancel</Button>
                <Button onClick={closeAddContentDialog}>Done</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddContentDialog;