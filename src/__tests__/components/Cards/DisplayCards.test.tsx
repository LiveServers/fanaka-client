import {mount,shallow} from "enzyme";
//import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DisplayCards from "../../../components/Cards/DisplayCards";
import IconButton from "@material-ui/core/IconButton";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

// configure({adapter:new Adapter()});
//start testing
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "/dashboard/firstyear"
    })
  }));
describe("display cards test case",()=>{

    const displayCardProps = {
        icon:<IconButton>
            <LibraryBooksIcon />
        </IconButton>,
        text:"demo text for display cards",
        value:"demo value for display cards"
    }

    it('should render displaycards component',()=>{
        const wrapper = shallow(<DisplayCards {...displayCardProps} />);
        expect(wrapper).toBeTruthy();
    });


});