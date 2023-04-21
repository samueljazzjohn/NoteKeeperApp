import { gql } from "@apollo/client"

const GET_NOTES = gql`
    query getNotes {
        Notes(id:"643c09bafa4b04106d925779"){
          title,
          description
        }
    }
`

export { GET_NOTES }