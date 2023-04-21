import { gql, parser } from "@apollo/client";
import { Parser } from "graphql/language/parser";

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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

export { REGISTER_USER, LOGIN_USER }