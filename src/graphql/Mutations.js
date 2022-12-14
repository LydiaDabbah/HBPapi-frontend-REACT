import { gql } from "@apollo/client";

export const CREATE_MOVIE = gql`
mutation createMovie($title: String!, $description: String!, $dateOfRelease: String!,$image: String!,  $likes: Int){
    createMovie(input: {title: $title, description: $description, dateOfRelease: $dateOfRelease, image: $image, likes:$likes}){
        _id
        title
    }
  
}
 `
// export const REMOVE_NOTE = gql`
// mutation removeNote($id: ID!){
//     removeNote(id: $id){
//         _id
//         title
//         content
//         date
//         author

//     }
// }
// `
// export const UPDATE_NOTE = gql`
// mutation updateNote($title: String!, $content: String!, $date: String!, $author: String!, $_id: ID){
//     updateNote(input: {title: $title, content: $content, date: $date, author: $author} ,  _id : $_id) {
//         _id
//         title
//         content
//         author
//         date
//     }
// }
// `

export const LOGIN = gql`
mutation  login($email: String, $password: String) {
        login(email: $email, password: $password)
 }
`
