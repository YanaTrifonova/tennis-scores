import gql from "graphql-tag";

export const GET_ALL_MATCHES = gql`
  query AllMatches {
    matches {
      id
      started_at
    }
  }
`;
