import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql `
    mutation signIn($email:String!,$password:String!){
        signIn(email:$email,password:$password){
            status
            id
        }
    }
`