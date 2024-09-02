/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getFonts{\n        fonts{\n          data{\n            id\n            attributes{\n              family_name\n              query_name\n              font_values{\n                font_name\n                font_family\n                font_link\n                price\n              }\n            }\n          }\n        }\n    }\n    ": types.GetFontsDocument,
    "\nquery getFontByFamilyName($query_name: String!) {\n    fonts(filters: { query_name: { eq: $query_name } }) {\n      data {\n        id\n        attributes {\n          family_name\n          query_name\n          font_values {\n            font_name\n            font_family\n            font_link\n            price\n          }\n        }\n      }\n    }\n  }\n  ": types.GetFontByFamilyNameDocument,
    "\n    query get_platform{\n        platforms{\n            data{\n            id\n            attributes{\n                platform_name\n                values{\n                    option\n                    value\n                }\n            }\n            }\n        }\n    }\n": types.Get_PlatformDocument,
    "\n    mutation Register($username: String!, $email: String!, $password: String!){\n        register(\n            input: {username: $username, email: $email, password: $password}\n        ){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n": types.RegisterDocument,
    "\n    mutation Login($idenifier: String!, $password: String!){\n        login(input: {identifier: $idenifier, password: $password}){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n": types.LoginDocument,
    "\n  mutation createFontOrder($data: FontOrderInput!) {\n    createFontOrder(data: $data) {\n      data {\n        attributes {\n          amount\n          token\n          fonts\n          user\n        }\n      }\n    }\n  }\n": types.CreateFontOrderDocument,
    "\n  query getUserFontOrders($userEmail: String!) {\n    fontOrders(filters: { user: { eq: $userEmail } }) {\n      data{\n        id\n        attributes{\n          createdAt\n          amount\n          fonts\n          user\n        }\n      }\n    }\n  }\n": types.GetUserFontOrdersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getFonts{\n        fonts{\n          data{\n            id\n            attributes{\n              family_name\n              query_name\n              font_values{\n                font_name\n                font_family\n                font_link\n                price\n              }\n            }\n          }\n        }\n    }\n    "): (typeof documents)["\n    query getFonts{\n        fonts{\n          data{\n            id\n            attributes{\n              family_name\n              query_name\n              font_values{\n                font_name\n                font_family\n                font_link\n                price\n              }\n            }\n          }\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getFontByFamilyName($query_name: String!) {\n    fonts(filters: { query_name: { eq: $query_name } }) {\n      data {\n        id\n        attributes {\n          family_name\n          query_name\n          font_values {\n            font_name\n            font_family\n            font_link\n            price\n          }\n        }\n      }\n    }\n  }\n  "): (typeof documents)["\nquery getFontByFamilyName($query_name: String!) {\n    fonts(filters: { query_name: { eq: $query_name } }) {\n      data {\n        id\n        attributes {\n          family_name\n          query_name\n          font_values {\n            font_name\n            font_family\n            font_link\n            price\n          }\n        }\n      }\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query get_platform{\n        platforms{\n            data{\n            id\n            attributes{\n                platform_name\n                values{\n                    option\n                    value\n                }\n            }\n            }\n        }\n    }\n"): (typeof documents)["\n    query get_platform{\n        platforms{\n            data{\n            id\n            attributes{\n                platform_name\n                values{\n                    option\n                    value\n                }\n            }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Register($username: String!, $email: String!, $password: String!){\n        register(\n            input: {username: $username, email: $email, password: $password}\n        ){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation Register($username: String!, $email: String!, $password: String!){\n        register(\n            input: {username: $username, email: $email, password: $password}\n        ){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($idenifier: String!, $password: String!){\n        login(input: {identifier: $idenifier, password: $password}){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation Login($idenifier: String!, $password: String!){\n        login(input: {identifier: $idenifier, password: $password}){\n            jwt\n            user{\n                username\n                email\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createFontOrder($data: FontOrderInput!) {\n    createFontOrder(data: $data) {\n      data {\n        attributes {\n          amount\n          token\n          fonts\n          user\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createFontOrder($data: FontOrderInput!) {\n    createFontOrder(data: $data) {\n      data {\n        attributes {\n          amount\n          token\n          fonts\n          user\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserFontOrders($userEmail: String!) {\n    fontOrders(filters: { user: { eq: $userEmail } }) {\n      data{\n        id\n        attributes{\n          createdAt\n          amount\n          fonts\n          user\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserFontOrders($userEmail: String!) {\n    fontOrders(filters: { user: { eq: $userEmail } }) {\n      data{\n        id\n        attributes{\n          createdAt\n          amount\n          fonts\n          user\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;