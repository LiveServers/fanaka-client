import { gql } from '@apollo/client';

const FETCH_MESSAGES = gql `
  query fetchMessages($roomName:String!){
    fetchMessages(roomName:$roomName){
      messages{
        from
        subject
      }
      _id
    }
  }
`;

export default FETCH_MESSAGES;
