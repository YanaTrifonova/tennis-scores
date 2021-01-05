import gql from "graphql-tag";

export const GET_ALL_MATCHES = gql`
  query AllMatches {
    matches(order_by: {id: desc}) {
      id
      started_at
      winner {
        name
      }
      p1 {
        image
        name
      }
      p2 {
        image
        name
      }
      setts {
        p1_score
        p2_score
      }
    }
  }
`;

export const PLAYED_MATCHES = gql`
query played {
    matches(order_by: {id: desc}, where: {finished: {_eq: true}}, limit: 5) {
        id
          started_at
          winner {
            name
          }
          p1 {
            image
            name
          }
          p2 {
            image
            name
          }
          setts {
            p1_score
            p2_score
          }
        }
  }
`;

export const MATCHES_IN_PROGRESS = gql`
query inProgress {
        matches(order_by: {id: desc}, where: {finished: {_eq: false}}) {
            id
                  started_at
                  winner {
                    name
                  }
                  p1 {
                    image
                    name
                  }
                  p2 {
                    image
                    name
                  }
                  setts {
                    p1_score
                    p2_score
                  }
            }
    }
`;