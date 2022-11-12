import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Chip,
} from "@mui/material";
import { Api } from "../../Api";


function CreateConversionForm({event, value, setEvent, setValue, component}) {
    function handleEventChange(event) {
        setEvent(event.target.value)
    }

    function handleValueChange(event) {
        setValue(event.target.value)
    }

    return (
        <div>
            <FormControl size="small" fullWidth sx={{mt: 1}} margin="dense">
                <InputLabel>Event</InputLabel>
                <Select
                    label="Event Type"
                    onChange={handleEventChange}
                    value={event}
                >
                    <MenuItem value="click">Click</MenuItem>
                    <MenuItem value="view">View</MenuItem>
                </Select>
            </FormControl>
            <TextField
                margin="dense"
                label="Conversion value ($)"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleValueChange}
                value={value}
            />
            <Stack direction="row" sx={{ mb: 1, mt: 1, flexWrap: 'wrap', gap: 1}}>
                {component.conversion_events.map((conversion, index) => <Chip label={`${conversion.event} | $${conversion.value}`} key={index} data-index={index} onDelete={() => {}}/>)}
            </Stack>
        </div>
    )
}

export default CreateConversionForm;