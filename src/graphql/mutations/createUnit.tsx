import { gql } from '@apollo/client';

const CREATE_UNIT = gql `
	mutation createUnit($input:UnitInput!){
		createUnit(input:$input){
			status
			message
		}
	} 
`;

export default CREATE_UNIT;
