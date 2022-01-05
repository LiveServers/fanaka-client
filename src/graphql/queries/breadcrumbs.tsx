import { gql } from '@apollo/client';

export const BREAD_CRUMBS_QUERY = gql`
    query getbreadcrumbs{
        breadCrumbList @client{
            name
            path
        }
    }
`;