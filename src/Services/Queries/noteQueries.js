import { gql } from "@apollo/client"

const GET_NOTES = gql`
    query getNotes {
        Notes{
          id,
          title,
          description
        }
    }
`

export { GET_NOTES }