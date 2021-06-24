import {shallow} from "enzyme";
//import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {makeStyles} from "@material-ui/core/styles";
import DisplayCards from "../../components/Cards/DisplayCards";
import Dashboard from "../../pages/Dashboard";


// configure({adapter:new Adapter()});

const useStyles = makeStyles(theme=>({
    cardGrid:{
        display:"grid",
        gridTemplateColumns:"50% 50%",
        gridTemplateRow:"minmax(50%,50%)",
        placeItems:"center",
        gridGap:"6%"
    }
}))

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