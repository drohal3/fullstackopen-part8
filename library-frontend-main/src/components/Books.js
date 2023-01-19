import { gql, useQuery } from '@apollo/client'
import {useState} from "react";

export const ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    genres
    id
    published
    title
    author {
      name
    }
  }
}
`
const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const books = useQuery(ALL_BOOKS, {variables: {genre: filter}})
  const genres = books.loading
    ? []
    : books.data.allBooks
      .map((book) => book.genres)
      .reduce((acu, val) => [...acu, ...val.filter((v) => !acu.includes(v))], [])

  if (!props.show) {
    return null
  }

  return books.loading ? (<div>loading...</div>) : (
    <div>
      <h2>books</h2>
      <h3>Filter</h3>
      <div>
        {genres.map((genre) => (<button key={genre} onClick={() => setFilter(genre)}>{genre}</button>) )}
        <button onClick={() => setFilter(null)}>reset filter</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Books
