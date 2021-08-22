import {InMemoryCache} from "@apollo/client";
import {breadCrumbList,cardData,semesterCardProps} from "./reactiveVariables";

export const ApolloCache:InMemoryCache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                breadCrumbList:{
                    read(){
                        return breadCrumbList()
                    }
                },
                cardData:{
                    read(){
                        return cardData()
                    }
                },
                semesterCardProps:{
                    read(){
                        return semesterCardProps();
                    }
                }
            }
        }
    }
});