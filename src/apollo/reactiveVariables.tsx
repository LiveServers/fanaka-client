import { makeVar } from '@apollo/client';
import * as Types from '../InterfacesEnumsTypes/Types/Type';
import * as Constants from '../constants/constants';
import * as Interfaces from '../InterfacesEnumsTypes/Interfaces/Interfaces';

const initialBreadCrumbs: Types.TypeBreadCrumbs = [
  {
    name: Constants.DASHBOARD,
    path: Constants.PATH,
  },
];

export const breadCrumbList = makeVar<Types.TypeBreadCrumbs>(initialBreadCrumbs);

export const cardData = makeVar<Interfaces.Semester>({
  text:'',
  path:'',
});

export const semesterCardProps = makeVar<Interfaces.SemesterCardProps>({
  year:'', 
  semester:'',
  path:'', 
  _id:'',
});