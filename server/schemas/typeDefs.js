const { gql } = require('apollo-server-express');
const typeDefs = gql`
type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

input BookData {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

type Query {
    # user: User
    # books: [Book]
    # book: Book
    me: User
}

type Mutation {
    # getSingleUser(username: String!): User
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookData!): User
    deleteBook(bookId: ID!): User
}

`

module.exports = typeDefs;
