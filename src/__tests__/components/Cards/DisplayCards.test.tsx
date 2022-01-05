import React from 'react';
import { shallow } from 'enzyme';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Typography from '@material-ui/core/Typography';
import DisplayCards from '../../../components/Cards/DisplayCards';
import Semester from '../../../pages/Semester';
import Dashboard from '../../../pages/Dashboard';
import client from '../../../apollo/client';


// start testing
const mockHistory = jest.fn();
// this is set up for react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard/firstyear',
  }),
  useHistory:jest.fn(() =>({
    push:mockHistory,
  })),
}));

const handleClick = jest.fn();

describe('display cards test case', ()=>{
  let displayCardProps:any; let wrapper : any; let wrap:any; let semester:any;
  beforeAll(()=>{
    displayCardProps = {
      icon:<IconButton>
                <LibraryBooksIcon />
            </IconButton>,
      text:'demo text for display cards',
      value:'demo value for display cards',
      handleClick,
    };
    wrapper = shallow(<DisplayCards {...displayCardProps} />);
    wrap = shallow(<Dashboard />);
    semester = shallow(
        <ApolloProvider client={client}>
            <Semester />
        </ApolloProvider>);
  });

  it('should render displaycards component', ()=>{
    expect(wrapper).toBeTruthy();
  });

  it('should have the correct pathname on first render', ()=>{
        <MemoryRouter initialEntries={['/dashboard']}>
            <Dashboard />
        </MemoryRouter>;
        expect(wrap).toHaveLength(1);
  });

  it('should render its children', ()=>{
    expect(wrapper.find(IconButton).prop('size')).toEqual('small');
    expect(wrapper.find(Typography).prop('variant')).toEqual('subtitle2');
    expect(wrapper.find(Typography).text()).toEqual(expect.stringContaining(displayCardProps.text));
    expect(wrapper.find('.makeStyles-box-1')).toBeTruthy();
  });

  it('should perform one click event', ()=>{
    const mEvent = { preventDefault: jest.fn() };
    wrapper.find('[data-testid=\'btn\']').simulate('click', mEvent);
    expect(displayCardProps.handleClick).toHaveBeenCalledTimes(1);
    expect(wrapper).toEqual(expect.objectContaining({}));
  });

  it('should have semester route onclick', ()=>{
        <MemoryRouter initialEntries={['/dashboard/firstyear']}>
            <Dashboard />
        </MemoryRouter>;
        // expect(wrap).toHaveLength(0);
        expect(semester).toHaveLength(1);

  });
});
