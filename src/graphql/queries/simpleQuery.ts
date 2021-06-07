import {gql} from "@apollo/client";

export const SIMPLE_QUERY = gql`
    query simpleQuery{
        simpleQuery @client
    }
`;