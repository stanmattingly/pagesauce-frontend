import {
    TextField,
    Stack,
    Chip,
} from "@mui/material";
import { useState } from "react";
import { Api } from "../../Api";


function AddContentForm({component, contents, setContents}) {
    const api = new Api();

    const handleContentEnter = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            api.createContent(component.universal_id, event.target.value).then(result => setContents([...contents, result]))
            event.target.value = '';
        }
    };

    function handleContentDelete(event) {
        let originalState = [...contents];
        const index = event.target.parentNode.parentNode.dataset.index;
        api.deleteContent(originalState[index].universal_id);
        originalState.splice(index, 1);
        setContents(originalState);
    }

    return (
        <div>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Text"
                type="text"
                fullWidth
                variant="standard"
                onKeyDown={handleContentEnter}
                helperText="Press 'Enter' to save"
            />
            <Stack direction="row" sx={{ mb: 1, mt: 1, flexWrap: 'wrap', gap: 1}}>
                {contents.map((content, index) => <Chip label={content.text} key={index} data-index={index} onDelete={handleContentDelete}/>)}
            </Stack>
        </div>
    )
}

export default AddContentForm;