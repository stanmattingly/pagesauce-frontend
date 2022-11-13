import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Tooltip,
} from "@mui/material"
import { useEffect, useState } from "react";

function ContentsTable({ contents, showAll }) {
    const [visibleContents, setVisibleContents] = useState([]);

    useEffect(() => {
        if (contents.length >= 1) {
            setVisibleContents(showAll ? contents : contents.slice(0, 3))
        }
    }, [contents])

    useEffect(() => {
        if (showAll) {
            setVisibleContents(contents)
        } else {
            setVisibleContents(contents.slice(0, 3))
        }
    }, [showAll])

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>📄 Content</TableCell>
                        <TableCell align="right">🤔 Considerations</TableCell>
                        <TableCell align="right">👆 Clicks</TableCell>
                        <TableCell align="right">💰 Conversions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleContents.map((content, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{maxWidth: 125, minWidth: 125}}>
                                <Tooltip title={content.text}>
                                    <Typography variant="body2" noWrap={true}>{content.text}</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">{content.considerations}</TableCell>
                            <TableCell align="right">{content.clicks}</TableCell>
                            <TableCell align="right">{content.conversions}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ContentsTable;