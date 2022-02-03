import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql `
    mutation signIn($userName:String!,$password:String!){
        signIn(userName:$userName,password:$password){
            status
            id
            role
            userName
        }
    }
`;

export const SIGN_UP = gql `
	mutation studentSignUp ($input : StudentInput!){
		studentSignUp(input:$input){
			status
			message
			id
			role
			userName
		}
	}
`;

export const LOG_OUT = gql `
  mutation logOut{
  logOut{
    status 
    message
  }
  }
`;
