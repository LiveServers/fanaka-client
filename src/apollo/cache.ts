import {InMemoryCache} from "@apollo/client";
import {simpleQuery} from "./reactiveVariables";

export const ApolloCache:InMemoryCache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                simpleQuery:{
                    read(){
                        return simpleQuery()
                    }
                }
            }
        }
    }
})