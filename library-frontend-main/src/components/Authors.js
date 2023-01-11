import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'


export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const SET_YEAR_OF_BIRTH = gql`
mutation setYearOfBirth($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born) 
  {
    name,
    born
  }
}
`

const AuthorYearOfBirthForm = () => {
  const [name, setName] = useState(null)
  const [year, setYear] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const options = authors.loading ? [] : authors.data.allAuthors.map(a => ({value: a.name, label: a.name}))

  const [ setYearOfBirth ] = useMutation(SET_YEAR_OF_BIRTH, {refetchQueries: [{ query: ALL_AUTHORS }]})

  const submit = async (event) => {
    event.preventDefault()
    const born = parseInt(year)
    await setYearOfBirth({variables: {name, born}})
    console.log('set year of birth...')

    setYear('')
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          <div>
            name
            <Select options={options}
              onChange={(selectedOption) => setName(selectedOption.value)}
            />
          </div>
          <div>
            year
            <input
              value={year}
              onChange={({target}) => setYear(target.value)}/>
          </div>
        </div>
        <button type="submit">set born year</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return authors.loading ? (<div>loading...</div>) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorYearOfBirthForm />
    </div>
  )
}

export default Authors
