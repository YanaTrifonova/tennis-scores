import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import ErrorIcon from "@material-ui/icons/Error";

import {MATCHES_IN_PROGRESS, PLAYED_MATCHES} from "../graphql/queries";
import MatchTable from "./MatchTable";

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

    const platedMatchesQuery = useQuery(PLAYED_MATCHES);
    const playedMatchesLoading = platedMatchesQuery.loading;
    const playedMatchesError = platedMatchesQuery.error;
    const playedMatchesData = platedMatchesQuery.data;

    const matchesInProgressQuery = useQuery(MATCHES_IN_PROGRESS);
    const matchesInProgressLoading = matchesInProgressQuery.loading;
    const matchesInProgressError = matchesInProgressQuery.error;
    const matchesInProgressData = matchesInProgressQuery.data;

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
                <MatchTable data={matchesInProgressData}/>
            </Container>

            <Container className={classes.root}>
                <Typography variant="h2">PLAYED MATCHES</Typography>
                <MatchTable data={playedMatchesData}/>
            </Container>
        </>
    );
}

export default MatchList;
