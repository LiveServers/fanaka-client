import { gql } from '@apollo/client';

const ADD_MESSAGE = gql `
  mutation addMessages($input:MessageInput!){
    addMessages(input:$input){
      status 
      message
    }
  }
`;

export default ADD_MESSAGE;
