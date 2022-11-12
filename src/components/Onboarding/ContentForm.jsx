import {
    Box,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    TextField,
    Stack,
    Chip,
} from '@mui/material';


function ContentForm({ components, selectedComponent, setSelectedComponent, contents, setContents, setContentName, createContent}) {
    const handleComponentChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    const handleContentNameChange = (event) => {
        setContentName(event.target.value);
    };

    const handleContentEnter = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            createContent();
            event.target.value = '';
        }
    };

    return (
        <Box component="form" noValidate sx={{ mt: 4, mb: 2 }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Component</InputLabel>
                <Select
                    value={selectedComponent}
                    label="Smart Component"
                    onChange={handleComponentChange}
                >
                    {components.map(component => <MenuItem value={component.universal_id}>{component.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                <TextField
                    required
                    label="Smart Content"
                    helperText="Press 'Enter' to add more"
                    onKeyDown={handleContentEnter}
                    onChange={handleContentNameChange}
                />
                {contents.length > 0 ? (
                    <Stack spacing={0} direction="row" sx={{ mb: 1, mt: 1, flexWrap: 'wrap', gap: 1}}>
                        {contents.map(item => <Chip label={item.text}/>)}
                    </Stack>
                ) : ''}
            </FormControl>
        </Box>
    )
}

export default ContentForm;