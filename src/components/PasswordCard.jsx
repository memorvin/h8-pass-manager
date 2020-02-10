import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { deletePassword } from '../store/actions'
import { SET_PASSWORD } from '../store/actionTypes'
import loader from '../assets/spin.gif'
import SweetAlert from 'sweetalert2-react'
import { CLEAR_PASSWORDS_ERROR, CLEAR_PASSWORDS_SUCCESS } from '../store/actionTypes'


export const PasswordCard = ({ password, toggleModal }) => {

  const dispatch = useDispatch()
  const [className, setClassName] = useState('hidden')
  const isLoading = useSelector(state => state.passwords.isLoading)
  const success = useSelector(state => state.passwords.success)
  const error = useSelector(state => state.passwords.error)

  const handleEdit = () => {
    dispatch({
      type: SET_PASSWORD,
      payload: password
    })
    toggleModal()
  }

  const handleDelete = (id) => {
    dispatch(deletePassword(id))  
  }

  const toggleClass = () => {
    if (className === 'hidden') {
      setClassName('')
    } else {  
      setClassName('hidden')
    }
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
          : <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
              <div className="overflow-hidden rounded-lg shadow-lg">
              {
                password.id === 0
                ? <>
                    <div>
                      <svg onClick={() => toggleModal()} className="mx-auto mt-16 mb-8 fill-current hover:text-gray-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="60" height="66" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
                      <h2 className="text-center text-xl mb-16">Add new password</h2>
                    </div>
                  </>
                : password.id === 1
                ? <>
                    <div>
                      <svg className="mx-auto mt-16 mb-8 fill-current" width="66" height="65" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M19 14.586l3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586zm-7 6.414h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z"/></svg>
                      <h2 className="text-center text-xl mb-16">No results found</h2>
                    </div>
                  </>
                : <>
                    <div>
                      <img alt="Placeholder" className="block h-20 w-20 mx-auto mt-2" src={password.image} />
                    </div>
                    <header className="items-center justify-between leading-tight p-2 md:p-4">
                      <h1 className="text-base flex mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg> &nbsp; {password.url}
                      </h1>
                      <h1 className="text-base flex mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg> &nbsp; {password.username}
                      </h1>
                      <h1 className="text-base flex">
                        <svg onClick={() => toggleClass()} className="cursor-pointer fill-current hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-5l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"/></svg> &nbsp; <p className={className}>{password.password}</p>
                      </h1>
                    </header>
                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                      <div className="flex py-1 items-center rounded-lg no-underline hover:underline text-white bg-blue-500" href="#">
                        <button onClick={() => handleEdit()} className="mx-2 text-sm">
                          Edit
                        </button>
                      </div>
                      <div className="flex py-1 items-center rounded-lg no-underline hover:underline text-white bg-blue-500" href="#">
                        <button onClick={() => handleDelete(password.id)} className="mx-2 text-sm">
                          Delete
                        </button>
                      </div>
                    </footer> 
                  </>
              }
                </div>
              </div>
  )
}

PasswordCard.propTypes = {
  password: PropTypes.object.isRequired,
  toggleModal: PropTypes.func
}