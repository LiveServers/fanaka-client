import { gql } from '@apollo/client';

const FETCH_UNITS_FOR_STUDENTS = gql `
	query fetchStudentDetailsAndFilesForRegisteredSemester($id:String!){
  fetchStudentDetailsAndFilesForRegisteredSemester(id:$id){
  result{
  files
    fileNames
  courseCode
  unitName
}
  studentDetails{
  semester
  certification
  id
  currentEnrolledProgramme
}
}
}
`;

export default FETCH_UNITS_FOR_STUDENTS;
