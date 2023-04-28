import { gql, parser } from "@apollo/client";
import { Parser } from "graphql/language/parser";

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                username,
                email
            },  
            token
        }
    }
`;

const GOOGLE_LOGIN  = gql`
    mutation googleLogin($email: String!,$username: String!) {
        loginGoogle(email: $email,username: $username) {
            user{
                username,
                email
            },
            token
        }
    }
`;

const FACEBOOK_LOGIN  = gql`
    mutation facebookLogin($email: String!,$username: String!) {
        loginFacebook(email: $email,username: $username) {
            user{
                username,
                email
            },
            token
        }
    }
`;

const GITHUB_LOGIN  = gql`
    mutation facebookLogin($email: String!,$username: String!) {
        loginFacebook(email: $email,username: $username) {
            user{
                username,
                email
            },
            token
        }
    }
`;

const REGISTER_USER = gql`
    mutation registerUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            username
        }
    }
`;

export { REGISTER_USER, LOGIN_USER, GOOGLE_LOGIN ,FACEBOOK_LOGIN,GITHUB_LOGIN}