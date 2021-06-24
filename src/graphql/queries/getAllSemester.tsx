import {gql} from "@apollo/client";

export const SEMESTER_QUERY = gql `
    query getAllSemesters($year:String!){
        getAllSemesters(year:$year){
            _id
            year
            semester
            path
        }
    }
`;