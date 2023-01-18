# Fullstack Open - Part8: GraphQL
Part 8 of the Full Stack online course https://fullstackopen.com/en/part8

## Exercise: 8.1: The number of books and authors
**Task:**
Implement queries bookCount and authorCount which return the number of books and the number of authors.

The query
```
query {
 bookCount
 authorCount
}
```
should return
```
{
 "data": {
  "bookCount": 7,
  "authorCount": 5
 }
}
```

**Solution:**
Resolvers and TypeDefs were defined.

## Exercise 8.2: All books
**Task:**
Implement query allBooks, which returns the details of all books.

In the end, the user should be able to do the following query:
```
query {
 allBooks {
  title
  author
  published
  genres
 }
}
```

**Solution:**
Resolver for allBooks was defined.

## Exercise: 8.3: All authors
**Task:**
Implement query allAuthors, which returns the details of all authors. The response should include a field bookCount containing the number of books the author has written.

For example the query
```
query {
allAuthors {
name
bookCount
}
}
```
should return
```
{
"data": {
"allAuthors": [
{
"name": "Robert Martin",
"bookCount": 2
},
{
"name": "Martin Fowler",
"bookCount": 1
},
{
"name": "Fyodor Dostoevsky",
"bookCount": 2
},
{
"name": "Joshua Kerievsky",
"bookCount": 1
},
{
"name": "Sandi Metz",
"bookCount": 1
}
]
}
}
```

**Solution:**
bookCount under Authors was implemented.

## Exercise 8.4: Books of an author
**Task:**
Modify the allBooks query so that a user can give an optional parameter author. The response should include only books written by that author.

For example query
```
query {
allBooks(author: "Robert Martin") {
title
}
}
```
should return
```
{
"data": {
"allBooks": [
{
"title": "Clean Code"
},
{
"title": "Agile software development"
}
]
}
}
```

**Solution:**
Optional parameter author for allBooks was implemented.

## Exercise 8.5: Books by genre
Modify the query allBooks so that a user can give an optional parameter genre. The response should include only books of that genre.

For example query
```
query {
allBooks(genre: "refactoring") {
title
author
}
}
```
should return
```
{
"data": {
"allBooks": [
{
"title": "Clean Code",
"author": "Robert Martin"
},
{
"title": "Refactoring, edition 2",
"author": "Martin Fowler"
},
{
"title": "Refactoring to patterns",
"author": "Joshua Kerievsky"
},
{
"title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
"author": "Sandi Metz"
}
]
}
}
```
The query must work when both optional parameters are given:
```
query {
allBooks(author: "Robert Martin", genre: "refactoring") {
title
author
}
}
```

**Solution:**
genre optional parameter to allBooks was implemented.

## Exercise 8.6: Adding a book
**Task:**
Implement mutation addBook, which can be used like this:
```
mutation {
addBook(
title: "NoSQL Distilled",
author: "Martin Fowler",
published: 2012,
genres: ["database", "nosql"]
) {
title,
author
}
}
```
The mutation works even if the author is not already saved to the server:
```
mutation {
addBook(
title: "Pimeyden tango",
author: "Reijo Mäki",
published: 1997,
genres: ["crime"]
) {
title,
author
}
}
```
If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet, so the query
```
query {
allAuthors {
name
born
bookCount
}
}
```
returns
```
{
"data": {
"allAuthors": [
// ...
{
"name": "Reijo Mäki",
"born": null,
"bookCount": 1
}
]
}
}
```

**Solution:**
Defined a mutation.

## Exercise 8.7: Updating the birth year of an author
**Task:**
Implement mutation editAuthor, which can be used to set a birth year for an author. The mutation is used like so:
```
mutation {
editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
name
born
}
}
```
If the correct author is found, the operation returns the edited author:
```
{
"data": {
"editAuthor": {
"name": "Reijo Mäki",
"born": 1958
}
}
}
```
If the author is not in the system, null is returned:
```
{
"data": {
"editAuthor": null
}
}
```

**Solution:**
editAuthor mutation implemented.

## Exercise 8.8: Authors view
**Task:**
*Take [this project](https://github.com/fullstack-hy2020/library-frontend) as a start for your application.*

Implement an Authors view to show the details of all authors on a page.

**Solution:**
Apolo client was installed with the following command
```
 npm install @apollo/client graphql
```
and taken into use.

## Exercise 8.9: Books view
**Task:**
Implement a Books view to show on a page all other details of all books except their genres.

**Solution:**
Implemented the books view - similar to the previous exercise.

## Exercise 8.10: Adding a book
**Task:**
Implement a possibility to add new books to your application.

Make sure that the Authors and Books views are kept up to date after a new book is added.

**Solution:**
Implemented as instructed - with refetchQueries option.

## Exercise 8.11: Authors birth year
**Task:**
Implement a possibility to set authors birth year. You can create a new view for setting the birth year, or place it on the Authors view:

Make sure that the Authors view is kept up to date after setting a birth year.

**Solution:**
Implemented in similar way than the previous exercise.

## Exercise 8.12: Authors birth year advanced
**Task:**
Change the birth year form so that a birth year can be set only for an existing author. Use select tag, react select, or some other mechanism.

**Solution:**
Implemented using [react-select](https://react-select.com/home).

```
npm install react-select
```

## Exercise 8.13: Database, part 1
**Task:**
Change the library application so that it saves the data to a database. You can find the mongoose schema for books and authors from [here](https://github.com/fullstack-hy/misc/blob/main/library-schema.md).

Let's change the book graphql schema a little
```
type Book {
title: String!
published: Int!
author: Author!
genres: [String!]!
id: ID!
}
```
so that instead of just the author's name, the book object contains all the details of the author.

You can assume that the user will not try to add faulty books or authors, so you don't have to care about validation errors.

The following things do not have to work just yet:

- allBooks query with parameters
- bookCount field of an author object
- author field of a book
- editAuthor mutation

Note: despite the fact that author is now an object within a book, the schema for adding a book can remain same, only the name of the author is given as a parameter
```
type Mutation {
addBook(
title: String!
author: String!
published: Int!
genres: [String!]!
): Book!
editAuthor(name: String!, setBornTo: Int!): Author
}
```

**Solution:**
Implemented as instructed.

## Exercise 8.14: Database, part 2
**Task:**
Complete the program so that all queries (to get allBooks working with the parameter author and bookCount field of an author object is not required) and mutations work.

You might find [this](https://docs.mongodb.com/manual/reference/operator/query/in/) useful.

**Solution:**
Implemented together with the previous exercise.

## Exercise 8.15 Database, part 3
**Task:**
Complete the program so that database validation errors (e.g. book title or author name being too short) are handled sensibly. This means that they cause UserInputError with a suitable error message to be thrown.

**Solution:**
Implemented as instructed.

## Exercise 8.16 user and logging in
**Task:**
Add user management to your application. Expand the schema like so:
```
type User {
username: String!
favouriteGenre: String!
id: ID!
}

type Token {
value: String!
}

type Query {
// ..
me: User
}

type Mutation {
// ...
createUser(
username: String!
favouriteGenre: String!
): User
login(
username: String!
password: String!
): Token
}
```
Create resolvers for query me and the new mutations createUser and login. Like in the course material, you can assume all users have the same hardcoded password.

Make the mutations addBook and editAuthor possible only if the request includes a valid token.

(Don't worry about fixing the frontend for the moment.)

**Solution:**
Implemented as instructed and thrown ForbiddenError on unauthorized editAuthor and addBook mutations.
(requires bearer token in Authorization header)
At this point it works only when using Apollo studio. Frontend will be fixed in the next exercises.