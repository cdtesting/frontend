import { graphql } from '@/src/__generated__';
import { gql } from '@apollo/client';


export const GET_FONTS = graphql(`
    query getFonts{
        fonts{
          data{
            id
            attributes{
              family_name
              query_name
              font_values{
                font_name
                font_family
                font_link
                price
              }
            }
          }
        }
    }
    `
)

export const GET_FONT_BY_FAMILY_NAME = graphql(`
query getFontByFamilyName($query_name: String!) {
    fonts(filters: { query_name: { eq: $query_name } }) {
      data {
        id
        attributes {
          family_name
          query_name
          font_values {
            font_name
            font_family
            font_link
            price
          }
        }
      }
    }
  }
  `
)
export const GET_PLATFORMS = gql(`
    query get_platform{
        platforms{
            data{
            id
            attributes{
                platform_name
                values{
                    option
                    value
                }
            }
            }
        }
    }
`)

// export const GET_FONT = graphql(`
//     query font($id: ID!){
//         font(id: $id){
//             data{
//           	id
//             attributes{
//                 name
//                 description
//                 price
//               	font_weight{
//                 	name
//                     price
//               	}
//             }
//         }
//         }
//     }
// `)

export const REGISTER_MUTATION = graphql(`
    mutation Register($username: String!, $email: String!, $password: String!){
        register(
            input: {username: $username, email: $email, password: $password}
        ){
            jwt
            user{
                username
                email
            }
        }
    }
`)

export const LOGIN = graphql(`
    mutation Login($idenifier: String!, $password: String!){
        login(input: {identifier: $idenifier, password: $password}){
            jwt
            user{
                username
                email
            }
        }
    }
`)

export const CREATE_ORDER = gql(`
  mutation createFontOrder($data: FontOrderInput!) {
    createFontOrder(data: $data) {
      data {
        attributes {
          amount
          token
          fonts
          user
        }
      }
    }
  }
`)

export const GET_USER_FONT_ORDERS = gql(`
  query getUserFontOrders($userEmail: String!) {
    fontOrders(filters: { user: { eq: $userEmail } }) {
      data{
        id
        attributes{
          createdAt
          amount
          fonts
          user
        }
      }
    }
  }
`)