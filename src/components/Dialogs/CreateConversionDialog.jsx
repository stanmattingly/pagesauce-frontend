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
import CreateConversionForm from "../Forms/CreateConversionForm";

function CreateConversionDialog({open, closeCreateConversion, component}) {

    const [event, setEvent] = useState('');
    const [value, setValue] = useState('');
    const [conversions, setConversions] = useState(component.conversion_events)

    function handleSave() {
        const api = new Api();
        api.createConversion(component.universal_id, event, value);
        closeCreateConversion();
    }

    return (
        <Dialog 
            open={open} 
            fullWidth={true}
            maxWidth='sm'
        >
            <DialogTitle component="div">
                <Typography variant="h6">Create Conversion</Typography>
                <Typography variant="subtitle1">{`Create a conversion for '${component.name}'`}</Typography>
            </DialogTitle>
            <DialogContent>
                <CreateConversionForm value={value} setValue={setValue} even={event} setEvent={setEvent} component={component}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeCreateConversion}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateConversionDialog;