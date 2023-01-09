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