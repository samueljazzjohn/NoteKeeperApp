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

export { ADD_NOTE }