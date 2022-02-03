import { gql } from '@apollo/client';

const FETCH_FILES_FOR_SPECIFIC_UNIT = gql `
query fetchFilesForSpecificUnit($id:String!){
  fetchFilesForSpecificUnit(id:$id){
  fileUrls
  fileNames
}
}
`;

export default FETCH_FILES_FOR_SPECIFIC_UNIT;
