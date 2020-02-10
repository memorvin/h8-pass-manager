import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../store/reducers'
import { PasswordCard } from '../components/PasswordCard'

test('renders password card', () => {
  const history = createMemoryHistory()
  const store = createStore(rootReducer)

  const data = {
    url: 'facebook.com',
    username: 'johnd',
    password: '71!TRYga',
    image: 'http://logo.clearbit.com/facebook.com',
    createdAt: 'February 10 at 4:24:52 AM',
    updatedAt: 'February 10 at 4:24:52 AM'
  }

  const { getByText, container } = render(
    <Provider store={store}>
      <Router history={history}>
        <PasswordCard password={data} />
      </Router>
    </Provider>,
  )

  const img = container.getElementsByTagName('img')
  expect(img[0]).toBeInTheDocument()
  expect(img[0].src).toEqual(data.image)
  expect(getByText(data.url)).toBeInTheDocument()
  expect(getByText(data.username)).toBeInTheDocument()
  expect(getByText(data.password)).toBeInTheDocument()
})