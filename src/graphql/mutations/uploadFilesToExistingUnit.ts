import { gql } from '@apollo/client';

const UPLOAD_TO_EXISTING_UNIT = gql `
	mutation uploadFilesToExistingUnit($input:UpdateUnits!){
		uploadFilesToExistingUnit(input:$input){
			status
			message
		}
	}
`;

export default UPLOAD_TO_EXISTING_UNIT;
