import React from "react";
import {shallow} from "enzyme";
import DisplayCards from "../../../components/Cards/DisplayCards";
import IconButton from "@material-ui/core/IconButton";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Typography from "@material-ui/core/Typography";

//start testing

//this is set up for react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "/dashboard/firstyear"
    }),
    useHistory:jest.fn(() =>({
        push:jest.fn()
    })),
  }));

const handleClick = jest.fn();

describe("display cards test case",()=>{
    const displayCardProps = {
        icon:<IconButton>
            <LibraryBooksIcon />
        </IconButton>,
        text:"demo text for display cards",
        value:"demo value for display cards",
        handleClick
    }
    const wrapper = shallow(<DisplayCards {...displayCardProps} />);

    it('should render displaycards component',()=>{
        expect(wrapper).toBeTruthy();
    });

    it("should render its children",()=>{
        expect(wrapper.find(IconButton).prop("size")).toEqual("small");
        expect(wrapper.find(Typography).prop("variant")).toEqual("subtitle2");
        expect(wrapper.find(Typography).text()).toEqual(expect.stringContaining(displayCardProps.text));
        expect(wrapper.find(".makeStyles-box-1")).toBeTruthy();
    });

    it("should perform one click event",()=>{
        const mEvent = { preventDefault: jest.fn() };
        wrapper.find("[data-testid='btn']").simulate("click",mEvent);
        expect(displayCardProps.handleClick).toHaveBeenCalledTimes(1);
        expect(wrapper).toEqual(expect.objectContaining({}));
   });
});
