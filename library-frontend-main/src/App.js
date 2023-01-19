import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import {useApolloClient} from '@apollo/client'
import {click} from "@testing-library/user-event/dist/click";

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null) // !clears on page refresh

  const client = useApolloClient()

  if (token && page === 'login') {
    setPage('authors')
  }

  let buttons = [
    {click: () => setPage('authors'), label: 'authors'},
    {click: () => setPage('books'), label: 'books'}
  ]

  if (token) {
    buttons.push({click: () => setPage('add'), label: 'add book'})
    buttons.push({click: () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }, label: 'logout'})
  } else {
    buttons.push({click: () => setPage('login'), label: 'login'})
  }

  return (
    <div>
      <div>
        {buttons.map((btn) => (<button onClick={btn.click}>{btn.label}</button> ))}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={setErrorMessage} />
    </div>
  )
}

export default App
