import {makeVar} from "@apollo/client";
import * as Types from "../InterfacesEnumsTypes/Types/Type";
import * as Constants from "../constants/constants";

const initialBreadCrumbs: Types.TypeBreadCrumbs = [
    {
        name: Constants.DASHBOARD,
        path: Constants.PATH
    }
]

export const breadCrumbList = makeVar<Types.TypeBreadCrumbs>(initialBreadCrumbs);
