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

export const fileInfo = makeVar({
  unit: '',
  unitId: '',
});

export const createUnit = makeVar({
  year: '',
  semester: '',
  unit: '',
  school: '',
  certification: '',
  programme: '',
  courseCode: '',
});

export const fileView = makeVar({
  unit: '',
  unitId: '',
});

export const errorHandler = makeVar({
  open: false,
  message: '',
});

export const files = makeVar([] as any);

export const studentId = makeVar('');

export const studentFileData = makeVar({
  courseCode: '',
  fileNames: [] as any,
  files: [] as any,
});

export const setFile = makeVar('');
export const setRoom = makeVar('');
export const setRoomId = makeVar('');
export const setMessages = makeVar([] as any);
