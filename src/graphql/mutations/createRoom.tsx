import { gql } from '@apollo/client';

const CREATE_ROOM = gql `
  mutation createRoom($input:RoomInput!){
    createRoom(input:$input){
      status
      message
    }
  }
`;

export default CREATE_ROOM;
