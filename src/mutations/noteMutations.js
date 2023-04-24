import { gql, parser } from "@apollo/client";

const ADD_NOTE = gql`
    mutation addNote($title: String!, $description: String!) {      
        addNote(title: $title, description: $description) { 
            user{
                username
            },
            note{
                title,
                description
            }
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            title
        }
    }
`;

export { ADD_NOTE,DELETE_NOTE }