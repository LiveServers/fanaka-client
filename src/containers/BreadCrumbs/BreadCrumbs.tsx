import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {BREAD_CRUMBS_QUERY} from "../../graphql/queries/breadcrumbs";
import * as Types from "../../InterfacesEnumsTypes/Types/Type";

const useStyles = makeStyles(theme=>({
    link:{
        color:"#000"
    },
    breadcrumbs:{
        marginTop:"-30px",
        marginBottom:"20px"
    }
}))

const BreadCrumbs = (): JSX.Element=>{
    const classes = useStyles();
    const {data} = useQuery(BREAD_CRUMBS_QUERY);
    const breadCrumbList: Types.TypeBreadCrumbs = data.breadCrumbList;
    return (
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumbs">
            {
                breadCrumbList.map(({path,name},index)=>(
                    <Link className={classes.link} key={index} to={path}>{name}</Link>
                ))
            }
        </Breadcrumbs>
    )
}

export default BreadCrumbs;