import { Button } from '@mui/material';
import { useTransition, animated, config } from 'react-spring'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';

function ExpandableTable({data, titles, fields, numInitVisible, showRowCount=false, rowCountConfig={title: "#", prefix: "", suffix: ""}}) {
    const [visibleRows, setVisibleRows] = useState(data.slice(0, numInitVisible));
    const [showAll, setShowAll] = useState(false);

    function handleShowAll() {
        setShowAll(true);
        setVisibleRows(data);
    }

    function handleHideAll() {
        setShowAll(false);
        setVisibleRows(data.slice(0, numInitVisible))
    }

    useEffect(() => {
        if (showAll){
            setVisibleRows(data);
        } else {
            setVisibleRows(data.slice(0, numInitVisible))
        }
    }, [data, showAll])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {showRowCount ? <TableCell>{rowCountConfig.title}</TableCell> : ''}
                        {titles.map((title, key) => (
                            <TableCell key={key}>{title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row, rowKey) =>(
                        <TableRow key={rowKey}>
                            {showRowCount ? <TableCell key={0}>{rowCountConfig.prefix}{rowKey+1}{rowCountConfig.suffix}</TableCell> : ''}
                            {fields.map((field, fieldKey) => (
                                <TableCell key={fieldKey+1}>{field.prefix}{row[field.key]}{field.suffix}{row[field.suffixField]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={!showAll ? handleShowAll : handleHideAll} disabled={data.length <= numInitVisible}>{!showAll && data.length > numInitVisible ? 'Show More' : data.length <= 1 ? 'Show More' : 'Show Less'}</Button>
        </TableContainer>
    )
}

export default ExpandableTable;