import { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TimeSince } from "../../utils/TimeSince";

function RecentActivity({ api, selectedAccountId }) {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        api.getActions(selectedAccountId).then(data => setActions(data))
    }, [])

    return (
        <div className="DashboardCard">
            <h3>Recent Activity</h3>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>📄 Plan</TableCell>
                            <TableCell align="right">💰 Price</TableCell>
                            <TableCell align="right">👆 Action</TableCell>
                            <TableCell align="right">⌚ Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actions.map(action => (
                            <TableRow key={action.id}>
                                <TableCell>{action.group.name}</TableCell>
                                <TableCell align="right">${action.price.price}/{action.price.term}</TableCell>
                                <TableCell align="right">{action.action}</TableCell>
                                <TableCell align="right">{TimeSince(new Date(action.created_at))} ago</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {actions.length === 0 ? <p>No Activity to See Yet!</p> : ''}
            </TableContainer>
        </div>
    )
}

export default RecentActivity;