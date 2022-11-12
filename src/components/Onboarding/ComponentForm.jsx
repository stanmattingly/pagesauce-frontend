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
import { useState, useEffect } from 'react';
import { Api } from '../../Api';


function ComponentForm({ selectedType, setSelectedType, components, setComponentName, createComponent }) {
    const api = new Api();
    const [componentTypes, setComponentTypes] = useState([])

    useEffect(() => {
        api.getComponentTypes().then(types => setComponentTypes(types));
    }, [])

    useEffect(() => {
        if (!selectedType && componentTypes.length > 0) {
            setSelectedType(componentTypes[0].universal_id);
        }
    }, [componentTypes])

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleNameChange = (event) => {
        setComponentName(event.target.value);
    };

    const handleNameEnter = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            createComponent();
            event.target.value = '';
        }
    };
    
    return (
        <Box component="form" noValidate sx={{ mt: 4, mb: 2 }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Component Type</InputLabel>
                <Select
                    value={selectedType}
                    label="Component Type"
                    onChange={handleTypeChange}
                >
                    {componentTypes.map(type => <MenuItem value={type.universal_id}>{type.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                <TextField
                    required
                    label="Name"
                    helperText="Ex. Hero Sign Up Button - Press 'Enter' to add"
                    onChange={handleNameChange}
                    onKeyDown={handleNameEnter}
                />
                {components.filter(component => component.type.universal_id === selectedType).length > 0 ? (
                    <Stack spacing={0} direction="row" sx={{ mb: 1, mt: 1, flexWrap: 'wrap', gap: 1}}>
                        {components.map(item => <Chip label={item.name}/>)}
                    </Stack>
                ) : ''}
            </FormControl>
        </Box>
    )
}

export default ComponentForm;