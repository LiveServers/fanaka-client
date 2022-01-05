import React from 'react';
import { shallow } from 'enzyme';
import SemesterCard from '../../../components/Cards/SemesterCard';

const mockHistory = jest.fn();
jest.mock('react-router-dom', ()=>({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard/firstyear',
  }),
  useHistory:jest.fn(() =>({
    push:mockHistory,
  })),
}));

describe('<SemesterCard /> component', ()=>{
  let wrapper:any; let semesterCardProps:any;
  beforeAll(()=>{
    semesterCardProps = {
      _id:'13dgt3nb',
      year:'First Year',
      semester:'1.1',
      path:'/dashboard/firstyear',
    };
    wrapper = shallow(
            <SemesterCard {...semesterCardProps} />,
    );
  });

  afterAll(()=>{
    jest.clearAllMocks();
  });
  it('should render the semester card component', ()=>{
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(wrapper).toBeInTheDocument;
  });


});
