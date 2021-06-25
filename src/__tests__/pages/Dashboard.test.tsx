import React from "react";
import {shallow} from "enzyme";
import {makeStyles} from "@material-ui/core/styles";
import DisplayCards from "../../components/Cards/DisplayCards";
import Dashboard from "../../pages/Dashboard";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "/dashboard/firstyear"
    }),
    useHistory:jest.fn(() =>({
        push:jest.fn()
    })),
  }));

describe("dashboard page test",()=>{

    it("should render 4 displaycards components",()=>{
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find(DisplayCards)).toHaveLength(4);
    });

    // it("should render the required props in display cards and div",()=>{
    //     //const classes = useStyles();
    //     const wrapper = shallow(<Dashboard />);
    //     expect(wrapper.find(DisplayCards).props().icon).toBeTruthy();
    //     expect(wrapper.find(DisplayCards).props().text).toBeTruthy();
    //     expect(wrapper.find(DisplayCards).props().value).toBeTruthy();
    //     //expect(wrapper.contains(<div className={classes.cardGrid}></div>)).toBeTruthy();
    // });

});










    // it("should render its children",()=>{
    //     const classes = useStyles();
    //     const dummyData = [
    //         {
    //             icon:<IconButton>
    //                     <LibraryBooksIcon />
    //                 </IconButton>,
    //             text:"demo text for display cards",
    //             value:"demo value for display cards"
    //         },
    //         {
    //             icon:<IconButton>
    //                     <LibraryBooksIcon />
    //                 </IconButton>,
    //             text:"demo text for display cards",
    //             value:"demo value for display cards"
    //         },
    //         {
    //             icon:<IconButton>
    //                     <LibraryBooksIcon />
    //                 </IconButton>,
    //             text:"demo text for display cards",
    //             value:"demo value for display cards"
    //         },
    //         {
    //             icon:<IconButton>
    //                     <LibraryBooksIcon />
    //                 </IconButton>,
    //             text:"demo text for display cards",
    //             value:"demo value for display cards"
    //         }
    //     ]
    //     const wrapper = shallow((
    //         <Dashboard>
    //             <div className={classes.cardGrid}>
    //                 {dummyData.map(({icon,text,value},index)=>(
    //                     <DisplayCards key={index} value={value} icon={icon} text={text} />
    //                 ))}
    //             </div>
    //         </Dashboard>
    //     ));

    //     expect(wrapper.contains())
    // })