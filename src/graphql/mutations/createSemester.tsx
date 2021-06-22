import {gql} from "@apollo/client";

export const CREATE_SEMESTER = gql `
    mutation createSemester($input:SemesterInput!){
        createSemester(input:$input){
            _id
            year
            semester
            path
        }
    }

`;