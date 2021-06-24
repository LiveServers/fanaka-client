import { ApolloClient } from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {ApolloCache} from "./cache";

const client = new ApolloClient({
    link:createUploadLink({
        uri:process.env.REACT_APP_BACKEND_URI,
        credentials:"include"
    }),
    cache:ApolloCache,
    connectToDevTools:process.env.REACT_APP_NODE_ENV !== "production"
});

export default client;