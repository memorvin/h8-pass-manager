import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../store/reducers'
import NavBar from '../components/NavBar'

test('renders navbar', () => {
  const history = createMemoryHistory()
  const store = createStore(rootReducer)

  const { getByText, getByPlaceholderText, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <NavBar />
      </Router>
    </Provider>,
  )

  const appName = getByText(/P455 Manager/i)
  const searchBar = getByPlaceholderText(/Find your password.../i)
  // const button = getByTestId('signout-btn')

  expect(appName).toBeInTheDocument()
  expect(searchBar).toBeInTheDocument()
  // expect(button).toBeInTheDocument()
})