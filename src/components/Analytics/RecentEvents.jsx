import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react";

import { Api } from '../../Api';

function RecentEvents({selectedWebsite}) {
    const [events, setEvents] = useState([]);
    const api = new Api();

    useEffect(() => {
        api.getAnalytics().then(results => setEvents(results));
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Component</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Event</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map(event => (
                        <TableRow>
                            <TableCell>{event.component_name}</TableCell>
                            <TableCell align="right">{event.content.text}</TableCell>
                            <TableCell align="right">{event.event}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RecentEvents;