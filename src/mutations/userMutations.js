import { gql, parser } from "@apollo/client";
import { Parser } from "graphql/language/parser";

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const GOOGLE_LOGIN  = gql`
    mutation googleLogin($email: String!,$username: String!) {
        loginGoogle(email: $email,username: $username) {
            token
        }
    }
`;

const FACEBOOK_LOGIN  = gql`
    mutation facebookLogin($email: String!,$username: String!) {
        loginFacebook(email: $email,username: $username) {
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

export { REGISTER_USER, LOGIN_USER, GOOGLE_LOGIN ,FACEBOOK_LOGIN}