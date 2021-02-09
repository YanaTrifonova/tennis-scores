import {Box, Paper, Table, TableBody, TableContainer, TableHead, withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((_) => ({
    root: {
        padding: "2em",
    },
    table: {
        minWidth: 200,
    },
    article: {
        marginBottom: "60px",
    }
}));

function MatchTable(props) {
    const classes = useStyles();
    const data = props.data;

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    return(
        <Box>
            {data.matches.map((match) => (
                <article key={match.id} className={classes.article}>
                    <p>Match ID: {match.id}</p>
                    <p>Match date: {match.started_at}</p>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Players</StyledTableCell>
                                    {match.setts?.map((sett, index) => {
                                        return <StyledTableCell>set {index + 1}</StyledTableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell>{match.p1.name}</StyledTableCell>
                                    {match.setts?.map((sett, index) => {
                                        return <StyledTableCell key={index}>{sett.p1_score}</StyledTableCell>
                                    })}
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>{match.p2.name}</StyledTableCell>
                                    {match.setts?.map((sett, index) => {
                                        return <StyledTableCell key={index}>{sett.p1_score}</StyledTableCell>
                                    })}
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {match.winner === null
                     ? <p>Winner: match is in process</p>
                     : <p>Winner: {match.winner?.name}</p>
                    }
                    <hr/>
                </article>
            ))}
        </Box>
    )
}


export default MatchTable;