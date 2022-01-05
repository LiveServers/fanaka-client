import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DisplayCards from '../../components/Cards/DisplayCards';
import Dashboard from '../../pages/Dashboard';

const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard/firstyear',
  }),
  useHistory:jest.fn(() =>({
    push:mockHistory,
  })),
}));

describe('dashboard page test', ()=>{
  let wrapper:any;
  beforeAll(()=>{
    wrapper = shallow(<Dashboard />);
  });
  it('should render 4 displaycards components', ()=>{
    expect(wrapper.find(DisplayCards)).toHaveLength(4);
  });

  it('should render the required props in display cards and div', ()=>{
    expect(wrapper.find(DisplayCards).first().props().icon).toBeTruthy();
    expect(wrapper.find(DisplayCards).first().props().text).toBeTruthy();
    expect(wrapper.find(DisplayCards).first().props().value).toBeTruthy();
    expect(wrapper.find(DisplayCards).first().props().handleClick).toBeTruthy();
  });

  it('should have the correct pathname on first render', ()=>{
      <MemoryRouter initialEntries={['/dashboard']}>
        <Dashboard />
      </MemoryRouter>;
      expect(wrapper).toHaveLength(1);
  });

});
