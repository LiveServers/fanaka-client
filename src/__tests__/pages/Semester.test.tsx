//import 'jsdom-global/register';
import React from "react";
import {shallow,mount} from "enzyme";
import { ApolloProvider } from "@apollo/client";
import {MockedProvider} from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import {Formik} from "formik";
import IconButton from "@material-ui/core/IconButton";
import client from "../../apollo/client";
import Semester from "../../pages/Semester";
import SemesterCard from "../../components/Cards/SemesterCard";
import {semesterMocks} from "../../utils/mocks";

//this is the semester page test suite
const setState = jest.fn();
// jest.mock("react", () => ({
//     ...jest.requireActual("react"),
//     useState:(initial: any) => [initial, setState]
//   }));
//(initial: any) => [initial, setState]
describe("<Semester /> test suite",()=>{
    let wrapper:any,loading:boolean,fetchData:any;
    const setState = jest.fn();
    const useStateMock:any = (init:any)=>[init,setState];
    //const useStateSpy = jest.spyOn(React, 'useState')
    //useStateSpy.mockImplementation((init:boolean) => [init, setState]);

    beforeAll(()=>{
        wrapper = shallow(
            <ApolloProvider client={client}>
                <Semester />
            </ApolloProvider>
        );
        loading = false;
        fetchData = [
            {
                _id:"13dgt3nb",
                year:"First Year",
                semester:"1.1",
                path:"/dashboard/firstyear"
            },
            {
                _id:"13dgt3ne",
                year:"First Year",
                semester:"1.2",
                path:"/dashboard/firstyear"
            }
        ]
    });

    afterAll(()=>{
        jest.clearAllMocks();
    })
    it("should render the semester component",()=>{
        <MemoryRouter initialEntries={["/dashboard/firstyear"]}>
            <Semester />
        </MemoryRouter>
        expect(wrapper).toBeTruthy();
        expect(wrapper).toHaveLength(1);
    });

    it("should not render two <SemesterCard /> components when loading is true",()=>{
        expect(wrapper.find(SemesterCard)).toHaveLength(0);
    });

    it("should render the <SemesterCard /> components ",async()=>{
        //we have to mock a graphql query(useuery hook)
        const wrap = shallow(
            <MockedProvider mocks={semesterMocks} addTypename={false}>
                <Semester />
            </MockedProvider>
        )
        await new Promise(resolve=>setTimeout(resolve,1000));
        expect(wrap.find(SemesterCard)).toBeInTheDocument;
    });

    it("should render 3 children",()=>{
        expect(wrapper.find("[data-testid='semestercards']")).toBeTruthy();
        expect(wrapper.find(Formik)).toBeInTheDocument;
        expect(wrapper.find("[data-testid='closed']")).toBeInTheDocument;
    });

    it("should render the close icon when state is true",()=>{
        //we need to perform a click event
        const mEvent = { preventDefault: jest.fn() };
        const wrap = shallow(
            <ApolloProvider client={client}>
                <Semester />
            </ApolloProvider>
        )
        console.log(wrap.debug())
        // wrap.find("#closed").simulate('click',mEvent);
        // expect(wrapper.find("[data-testid='open']")).toBeTruthy();
        // expect(wrapper.find("[data-testid='closed']")).toBeFalsy();
    });
});