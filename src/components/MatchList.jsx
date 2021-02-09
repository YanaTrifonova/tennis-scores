import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Table, TableBody, TableContainer, TableHead, Typography, withStyles} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import ErrorIcon from "@material-ui/icons/Error";

import {MATCHES_IN_PROGRESS, PLAYED_MATCHES} from "../graphql/queries";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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

function MatchList() {
    const classes = useStyles();
    // const {
    //     loading,
    //     error,
    //     data
    // } = useQuery(GET_ALL_MATCHES);

    const platedMatchesQuery = useQuery(PLAYED_MATCHES);
    const playedMatchesLoading = platedMatchesQuery.loading;
    const playedMatchesError = platedMatchesQuery.error;
    const playedMatchesData = platedMatchesQuery.data;

    const matchesInProgressQuery = useQuery(MATCHES_IN_PROGRESS);
    const matchesInProgressLoading = matchesInProgressQuery.loading;
    const matchesInProgressError = matchesInProgressQuery.error;
    const matchesInProgressData = matchesInProgressQuery.data;

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

    if (playedMatchesLoading || matchesInProgressLoading) return "Loading...";
    if (playedMatchesError)
        return (
            <p>
                <ErrorIcon fontSize="large"/>
                Error! ${playedMatchesError.message}
            </p>
        );

    if (matchesInProgressError)
        return (
            <p>
                <ErrorIcon fontSize="large"/>
                Error! ${matchesInProgressError.message}
            </p>
        );

    return (
        <>
            <Container className={classes.root}>
                <Typography variant="h2">MATCHES IN PROGRESS</Typography>
                <Box>
                    {matchesInProgressData.matches.map((match) => (
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
            </Container>

            <Container className={classes.root}>
                <Typography variant="h2">PLAYED MATCHES</Typography>
                <Box>
                    {playedMatchesData.matches.map((match) => (
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
            </Container>
        </>
    );
}

export default MatchList;
