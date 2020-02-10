import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { addPassword, editPassword } from '../store/actions'
import loader from '../assets/spin.gif'
import SweetAlert from 'sweetalert2-react'
import { CLEAR_PASSWORDS_ERROR, CLEAR_PASSWORDS_SUCCESS } from '../store/actionTypes'

export const PasswordForm = ({ toggleModal, show }) => {

  const dispatch = useDispatch()
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const statePassword = useSelector(state => state.passwords.password)
  const isLoading = useSelector(state => state.passwords.isLoading)
  const success = useSelector(state => state.passwords.success)
  const error = useSelector(state => state.passwords.error)

  useEffect(() => {
    if (statePassword) {
      setPassword(statePassword.password)
      setUsername(statePassword.username)
      setUrl(statePassword.url)
    }
  }, [statePassword, toggleModal])

  const invalid = 'text-red-500 text-xs italic'
  const valid = 'text-green-500 text-xs italic'

  const updateUrl = (e) => {
    setUrl(e.target.value)
  }
  
  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_PASSWORDS_ERROR
    })
  }

  const clearSuccess = () => {
    dispatch({
      type: CLEAR_PASSWORDS_SUCCESS
    })
  }
  
  const handleSubmit = useCallback(() => {
    if (statePassword) {
      dispatch(editPassword({
        username: username,
        password: password,
        url: url,
        id: statePassword.id,
        createdAt: statePassword.createdAt
      }))
    } else {
      dispatch(addPassword({
        url: url,
        username: username,
        password: password
      }))
      setUrl('')
      setUsername('')
      setPassword('')
      toggleModal()
    }
  }, [dispatch, password, username, url, statePassword, toggleModal]);

  if (!show) {
    return null
  }
  return (
    isLoading
      ? <img src={loader} alt="loading" className="mx-auto mt-20"/>
      : error
        ? <SweetAlert
            show={error}
            title="Error"
            text={error}
            onConfirm={() => clearError()}
          />
        : success
          ? <SweetAlert
            show={success}
            title="Success"
            text={success}
            onConfirm={() => clearSuccess()}
          />
          : <form className="w-1/2 mx-auto max-w-sm" >
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label for="url" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    URL
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="https://www.facebook.com" value={url} onChange={updateUrl} />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label for="username" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Username
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="johndoe" value={username} onChange={updateUsername} />
                </div>
              </div>
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/3">
                  <label for="password" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input data-testid="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" placeholder="******************" value={password} onChange={updatePassword} />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <p className={/[A-Z]/.test(password) ? valid : invalid}>Password should have upper case character</p>
                    <p className={/[a-z]/.test(password) ? valid : invalid}>Password should have lower case character</p>
                    <p className={/[!@#$%^&]/.test(password) ? valid : invalid}>Password should have special character</p>
                    <p className={/[0-9]/.test(password) ? valid : invalid}>Password should have number</p>
                    <p className={password.length > 6 ? valid : invalid}>Password should be 6 digits at least</p>
                  </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button onClick={handleSubmit} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Submit
                  </button>
                </div>
              </div>
            </form>
  )
}

PasswordForm.propTypes = {
  show: PropTypes.bool,
  toggleModal: PropTypes.func
}