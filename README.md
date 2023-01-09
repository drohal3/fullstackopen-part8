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