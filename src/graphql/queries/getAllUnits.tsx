import { gql } from '@apollo/client';

const GET_ALL_UNITS = gql `
    query getAllUnits($courseCode:String!){
       getAllUnits(courseCode:$courseCode){
        unitName
        _id
    }
}
`;

export default GET_ALL_UNITS;
