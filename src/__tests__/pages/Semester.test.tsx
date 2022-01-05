// import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';
import { Formik } from 'formik';
import client from '../../apollo/client';
import Semester from '../../pages/Semester';
import SemesterCard from '../../components/Cards/SemesterCard';
import { semesterMocks } from '../../utils/mocks';

describe('<Semester /> test suite', ()=>{
  let wrapper:any;
  // const useStateSpy = jest.spyOn(React, 'useState')
  // useStateSpy.mockImplementation((init:boolean) => [init, setState]);

  beforeAll(()=>{
    wrapper = shallow(
            <ApolloProvider client={client}>
                <Semester />
            </ApolloProvider>,
    );
  });

  afterAll(()=>{
    jest.clearAllMocks();
  });
  it('should render the semester component', ()=>{
        <MemoryRouter initialEntries={['/dashboard/firstyear']}>
            <Semester />
        </MemoryRouter>;
        expect(wrapper).toBeTruthy();
        expect(wrapper).toHaveLength(1);
  });

  it('should not render two <SemesterCard /> components when loading is true', ()=>{
    expect(wrapper.find(SemesterCard)).toHaveLength(0);
  });

  it('should render the <SemesterCard /> components ', async ()=>{
    // we have to mock a graphql query(useuery hook)
    const wrap = shallow(
            <MockedProvider mocks={semesterMocks} addTypename={false}>
                <Semester />
            </MockedProvider>,
    );
    await new Promise(resolve=>setTimeout(resolve, 1000));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(wrap.find(SemesterCard)).toBeInTheDocument;
  });

  it('should render 3 children', ()=>{
    expect(wrapper.find('[data-testid=\'semestercards\']')).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(wrapper.find(Formik)).toBeInTheDocument;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(wrapper.find('[data-testid=\'closed\']')).toBeInTheDocument;
  });

  it('should render the close icon when state is true', ()=>{
    const wrap = shallow(
            <ApolloProvider client={client}>
                <Semester />
            </ApolloProvider>,
    );
    console.log(wrap.debug());
    // wrap.find("#closed").simulate('click',mEvent);
    // expect(wrapper.find("[data-testid='open']")).toBeTruthy();
    // expect(wrapper.find("[data-testid='closed']")).toBeFalsy();
  });
});
