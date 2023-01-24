import { gql, useQuery } from '@apollo/client'
import {GENRES_BOOKS} from "./Books";
// Books could be reused (or abstracted)

const ME = gql`
  query Query {
    me {
      username
      favouriteGenre
      id
    }
  }
`
const Recommended = (props) => {
  const me = useQuery(ME)

  const favoriteGenre = me.loading ? null : me.data.me.favouriteGenre

  const recommendedBooks = useQuery(GENRES_BOOKS, {variables: {genre: favoriteGenre}})

  if (!props.show) {
    return null
  }

  return recommendedBooks.loading ? (<div>loading...</div>) : (
    <div>
      <h2>Recommended Books</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {recommendedBooks.data.allBooks.map((a) => (
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

export default Recommended