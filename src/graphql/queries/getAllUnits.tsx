import { gql } from '@apollo/client';

const GET_ALL_UNITS = gql `
    query getAllUnits($semester:String!){
       getAllUnits(semester:$semester){
        author
        year
        unitName
        semester{
            _id
            year
            semester
            path
        }
        files
    }
}
`;

export default GET_ALL_UNITS;