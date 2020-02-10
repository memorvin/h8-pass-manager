import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../store/reducers'
import { PasswordForm } from '../components/PasswordForm'

test('renders password form', () => {
  const history = createMemoryHistory()
  const store = createStore(rootReducer)

  const { getByText, getByTestId, container } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordForm show={true}/>
      </Router>
    </Provider>,
  )

  expect(getByText('URL')).toBeInTheDocument()
  expect(getByText('Username')).toBeInTheDocument()
  expect(getByText('Password')).toBeInTheDocument()

  const inputs = container.getElementsByTagName('input')
  expect(inputs.length).toEqual(3)
  expect(inputs[0].placeholder).toEqual('https://www.facebook.com')
  expect(inputs[1].placeholder).toEqual('johndoe')
  expect(inputs[2].placeholder).toEqual('******************')

  const length = getByText(/Password should have upper case character/i)
  const uppercase = getByText(/Password should have lower case character/i)
  const lowercase = getByText(/Password should have special character/i)
  const numeric = getByText(/Password should have number/i)
  const specialchar = getByText(/Password should be 6 digits at least/i)

  fireEvent.change(getByTestId('password'), { target: { value: '99<Seratus!' } })
  expect(length).toHaveClass('text-green-500 text-xs italic')
  expect(uppercase).toHaveClass('text-green-500 text-xs italic')
  expect(lowercase).toHaveClass('text-green-500 text-xs italic')
  expect(numeric).toHaveClass('text-green-500 text-xs italic')
  expect(specialchar).toHaveClass('text-green-500 text-xs italic')

  fireEvent.change(getByTestId('password'), { target: { value: '' } })
  expect(length).toHaveClass('text-red-500 text-xs italic')
  expect(uppercase).toHaveClass('text-red-500 text-xs italic')
  expect(lowercase).toHaveClass('text-red-500 text-xs italic')
  expect(numeric).toHaveClass('text-red-500 text-xs italic')
  expect(specialchar).toHaveClass('text-red-500 text-xs italic')
})