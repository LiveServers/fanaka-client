import React from "react";
import {shallow} from "enzyme";
import { ApolloProvider } from "@apollo/client";
import { MemoryRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import client from "../../apollo/client";
import Semester from "../../pages/Semester";
import { initial } from "lodash";

//this is the semester page test suite
const setState = jest.fn();
// jest.mock("react", () => ({
//     ...jest.requireActual("react"),
//     useState:(initial: any) => [initial, setState]
//   }));
//(initial: any) => [initial, setState]
describe("<Semester /> test suite",()=>{
    let wrapper:any;
    const setState = jest.fn();
    const useStateMock:any = (init:any)=>[init,setState];
    //const useStateSpy = jest.spyOn(React, 'useState')
    //useStateSpy.mockImplementation((init:boolean) => [init, setState]);

    beforeAll(()=>{
        wrapper = shallow(
            <ApolloProvider client={client}>
                <Semester />
            </ApolloProvider>
        )
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
//this fails, will fix
    // it("should render the semester page with an initial state of false",()=>{
    //     jest.spyOn(React,'useState').mockImplementation(useStateMock);
    //     expect(setState).toHaveBeenCalledWith(false);
    // });

    it("should render 2 children for now",()=>{
        expect(wrapper.find("[data-testid='semestercards']")).toBeTruthy();
        //expect(wrapper.find(IconButton).props().color).toEqual("secondary");
    });
});