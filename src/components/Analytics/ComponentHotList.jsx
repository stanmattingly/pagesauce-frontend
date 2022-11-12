import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Chip,
    Stack,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react";

import { Api } from '../../Api';

function ComponentHotList({selectedWebsite}) {
    const [components, setComponents] = useState([]);
    const api = new Api();

    useEffect(() => {
        api.getComponents().then(results => setComponents(results));
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Component</TableCell>
                        <TableCell align="right">🔥 Hottest Content</TableCell>
                        <TableCell align="right">👀 Views</TableCell>
                        <TableCell align="right">💰 Conversions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {components.map(item => (
                        <TableRow>
                            <TableCell>
                                <Stack>
                                    <Typography variant="p" component="p">{item.name}</Typography>
                                    <Typography variant="caption" component="p" color="primary">{item.type.name}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">
                                <Stack>
                                    <Typography variant="p" component="p">{item.hottest_content.text}</Typography>
                                    <Typography variant="caption" component="p" color="primary">🏆 {item.hottest_content.normalized_hotness} </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">{item.views}</TableCell>
                            <TableCell align="right">{item.conversions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ComponentHotList;