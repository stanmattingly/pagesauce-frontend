import {
    Card,
    CardContent,
    CardActions,
    Button,
    CardHeader,
    Avatar,
    IconButton,
    Stack,
    Chip,
    Divider,
    FormGroup,
    FormControlLabel,
    Switch
} from "@mui/material"

import {
    Navigation,
    Visibility,
    Paid,
    Edit,
    VisibilityOff,
    ViewQuilt,
    AddCircle,
    CheckBox,
    Iso,
} from '@mui/icons-material'
import { useEffect, useState } from "react";
import { Api } from "../../Api";
import ContentsTable from "./ContentsTable";
import AddContentDialog from "../Dialogs/AddContentDialog";
import CreateConversionDialog from "../Dialogs/CreateConversionDialog";

function ComponentAnalytics({ component }) {
    const [contents, setContents] = useState([]);
    const [showAllContents, setShowAllContents] = useState(false)
    const [open, setOpen] = useState(false);
    const [createConversionOpen, setCreateConversionOpen] = useState(false);
    const [live, setLive] = useState(component.is_live);

    const api = new Api();

    const handleSetLive = (event) => {
        setLive(event.target.checked);
        api.setComponentLiveStatus(component.universal_id, event.target.checked);
    };

    useEffect(() => {
        api.getContents(component.universal_id).then(results => setContents(results));
    }, []);

    const openAddContentDialog = () => {
        setOpen(true);
    };

    const openCreateConversion = () => {
        setCreateConversionOpen(true);
    };
    
    const closeCreateConversion = () => {
        setCreateConversionOpen(false);
    };

    const closeAddContentDialog = () => {
        setOpen(false);
    };

    const handleHideShowAll = () => {
        setShowAllContents(!showAllContents);
    };

    return (
        <Card elevation={3} sx={{borderRadius: "16px"}}>
            <CardHeader
                avatar={
                    <Avatar>
                        {component.element_type[0]}
                    </Avatar>
                }
                action={
                    <FormGroup sx={{marginRight: "10px"}}>
                        <FormControlLabel control={<Switch checked={live} onChange={handleSetLive} color="success"/>} label={live ? "Live" : "Off"} labelPlacement="start"/>
                    </FormGroup>
                }
                title={component.name}
                subheader={`${component.url_path === '/' ? 'Home Page' : component.url_path}`}
            />
            <CardContent sx={{mt:0, pt:0}}>
                <Stack direction="row" spacing={1}>
                    <Chip label={`${component.element_type}`} size="small" icon={<ViewQuilt/>}/>
                    <Divider orientation="vertical" flexItem />
                    <Chip label={`${component.views} views`} size="small" icon={<Visibility/>} variant="outlined"/>
                    <Chip label={`${component.clicks} clicks`} size="small" icon={<Navigation/>} variant="outlined"/>
                    <Chip label={`$${component.conversions_value} | ${component.conversions}`}  size="small" icon={<Paid/>} variant="outlined"/>
                </Stack>
            </CardContent>
            <Divider light />
            <ContentsTable contents={contents} showAll={showAllContents}/>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" onClick={openAddContentDialog} startIcon={<Edit/>}>Content</Button>
                <Button size="small" onClick={openCreateConversion} startIcon={<Iso/>}>Conversions</Button>
                <Button size="small" onClick={handleHideShowAll} startIcon={showAllContents ? <VisibilityOff/> : <Visibility/>} disabled={contents.length < 4}>
                    {showAllContents ? 'Hide' : 'Show All'}
                </Button>
            </CardActions>
            <AddContentDialog open={open} closeAddContentDialog={closeAddContentDialog} component={component} contents={contents} setContents={setContents} />
            <CreateConversionDialog open={createConversionOpen} closeCreateConversion={closeCreateConversion} component={component}/>
        </Card>
    )
}

export default ComponentAnalytics;