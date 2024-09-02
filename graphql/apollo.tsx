"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { PropsWithChildren } from "react";

const StrapiApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }): React.ReactElement => {
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};

export default StrapiApolloProvider;

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
            errorPolicy: "all",
        },
        query: {
            errorPolicy: "all",
        },
    },
});
